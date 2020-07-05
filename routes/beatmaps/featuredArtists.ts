import express from 'express';
import { FeaturedArtistModel } from '../../models/featuredArtist';
import { isLoggedIn } from '../../helpers/middlewares';

const featuredArtistsRouter = express.Router();

featuredArtistsRouter.use(isLoggedIn);

/* GET artists for new map entry */
featuredArtistsRouter.get('/', async (req, res) => {
    const featuredArtists = await FeaturedArtistModel.find({ osuId: { $gt: 0 } });

    res.json(featuredArtists);
});

/* GET songs for new map entry */
featuredArtistsRouter.get('/:id/songs', async (req, res) => {
    const fa = await FeaturedArtistModel
        .findById(req.params.id)
        .populate({ path: 'songs', select: 'artist title' })
        .sort({ label: -1 })
        .orFail();

    res.json(fa.songs);
});

export default featuredArtistsRouter;
