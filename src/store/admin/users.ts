import { MainState } from '@store/main';
import { Module } from 'vuex';
import { User } from '../../../interfaces/user';

interface UserState {
    users: User[];
}

const store: Module<UserState, MainState> = {
    state: {
        users: [],
    },
    mutations: {
        setUsers (state, users: User[]): void {
            state.users = users;
        },
        updateBadge (state, payload): void {
            const user = state.users.find(u => u.id == payload.userId);

            if (user) {
                user.queuedBadge = payload.badge;
            }
        },
        updateDiscordId (state, payload): void {
            const user = state.users.find(u => u.id == payload.userId);

            if (user) {
                user.discordId = payload.discordId;
            }
        },
        updateIsShowcaseMapper (state, payload): void {
            const user = state.users.find(u => u.id == payload.userId);

            if (user) {
                user.isShowcaseMapper = payload.isShowcaseMapper;
            }
        },
        updateIsMentorshipAdmin (state, payload): void {
            const user = state.users.find(u => u.id == payload.userId);

            if (user) {
                user.isMentorshipAdmin = payload.isMentorshipAdmin;
            }
        },
        updateHasMerchAccess (state, payload): void {
            const user = state.users.find(u => u.id == payload.userId);

            if (user) {
                user.hasMerchAccess = payload.hasMerchAccess;
            }
        },
    },
};

export default store;
