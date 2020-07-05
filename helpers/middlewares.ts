import { UserModel } from '../models/user';
import { UserGroup } from '../interfaces/user';
import { refreshToken, isOsuResponseError, getUserInfo } from './osuApi';

export async function isLoggedIn(req, res, next): Promise<void> {
    if (req.session.mongoId) {
        const u = await UserModel.findById(req.session.mongoId);

        // Refresh if less than 10 hours left
        if (new Date() > new Date(req.session.expireDate - (10 * 3600 * 1000))) {
            const response = await refreshToken(req.session.refreshToken);

            if (!response || isOsuResponseError(response)) {
                req.session.destroy();

                return res.redirect('/');
            }

            // *1000 because maxAge is miliseconds, oauth is seconds
            req.session.cookie.maxAge = response.expires_in * 2 * 1000;
            req.session.expireDate = Date.now() + (response.expires_in * 1000);
            req.session.accessToken = response.access_token;
            req.session.refreshToken = response.refresh_token;
        }

        res.locals.userRequest = u;
        next();
    } else {
        req.session.lastPage = req.originalUrl;
        res.redirect('/');
    }
}

export function isAdmin(req, res, next): void {
    if (res.locals.userRequest.group == UserGroup.Admin) {
        next();
    } else {
        res.redirect('/');
    }
}

export function isSuperAdmin(req, res, next): void {
    if (res.locals.userRequest.osuId == 3178418 || res.locals.userRequest.osuId == 1052994) {
        next();
    } else {
        res.redirect('/');
    }
}

export function isUser(req, res, next): void {
    if (res.locals.userRequest.group == UserGroup.Admin || res.locals.userRequest.group == UserGroup.User) {
        next();
    } else {
        res.redirect('/');
    }
}

export function isNotSpectator(req, res, next): void {
    if (res.locals.userRequest.group != UserGroup.Spectator) {
        next();
    } else {
        return res.json({ error: 'Spectators cannot perform this action!' });
    }
}

export async function isBn(accessToken): Promise<boolean> {
    if (accessToken) {
        const res = await getUserInfo(accessToken);

        if (!isOsuResponseError(res) && (res.is_nat || res.is_bng)) {
            return true;
        }
    }

    return false;
}
