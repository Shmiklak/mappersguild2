<template>
    <div class="row">
        <div class="col-sm-12 mb-2">
            <b>Objective:</b>
            <div class="text-secondary mt-1" v-html="$md.render(mission.objective.trim())" />
        </div>
        <div v-if="mission.isShowcaseMission" class="col-sm-12 mb-4">
            <song-selection
                :mission="mission"
            />
        </div>
        <div class="col-sm-12 mb-2">
            <b>Win condition:</b>
            <div class="text-secondary mt-1" v-html="$md.render(mission.winCondition.trim())" />
        </div>
        <div v-if="requirements.length" class="col-sm-12 mb-2">
            <b>Requirements:</b>
            <ul class="text-danger">
                <li v-for="requirement in requirements" :key="requirement">
                    {{ requirement.text }} <b>{{ requirement.bold }}</b>
                </li>
            </ul>
        </div>
        <hr />
        <div class="col-sm-12 small">
            <b>Deadline:</b>
            <span class="text-secondary ms-1">{{ new Date(mission.deadline).toLocaleString() }}</span>
        </div>
        <div class="col-sm-12 small">
            <b>Applicable Featured Artists:</b>
            <span v-if="mission.artists && mission.artists.length" class="text-secondary ms-1">
                <artist-link-list
                    :artists="mission.artists"
                />
            </span>
            <span v-else class="text-secondary ms-1">Any. See the <a href="https://osu.ppy.sh/beatmaps/artists" target="_blank">full Featured Artist listing</a>.</span>
            <div v-if="mission.artists && mission.artists.length">
                <a
                    v-for="artist in mission.artists"
                    :key="artist.id"
                    :href="`https://osu.ppy.sh/beatmaps/artists/${artist.osuId}`"
                    target="_blank"
                >
                    <img
                        v-bs-tooltip="artist.label"
                        :src="`https://assets.ppy.sh/artists/${artist.osuId}/cover.jpg`"
                        class="artist-avatar me-2 my-1"
                    />
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { Mission } from '@interfaces/mission';
import ArtistLinkList from '@components/ArtistLinkList.vue';
import SongSelection from './SongSelection.vue';

export default defineComponent({
    name: 'MissionCard',
    components: {
        ArtistLinkList,
        SongSelection,
    },
    props: {
        mission: {
            type: Object as () => Mission,
            required: true,
        },
    },
    computed: {
        ...mapState([
            'loggedInUser',
        ]),
        requirements(): any[] {
            let requirements: any = [];

            if (this.mission.userMaximumRankedBeatmapsCount || this.mission.userMaximumRankedBeatmapsCount === 0) {
                requirements.push({
                    text: `You must have no more than `,
                    bold: `${this.mission.userMaximumRankedBeatmapsCount} ranked beatmaps`,
                });
            }

            if (this.mission.userMaximumGlobalRank) {
                requirements.push({
                    text: `You must be no higher than `,
                    bold: `${this.mission.userMaximumGlobalRank.toLocaleString()} global rank`,
                });
            }

            if (this.mission.userMaximumPp) {
                requirements.push({
                    text: `Your performance points in the relevant mode must be no higher than `,
                    bold: `${this.mission.userMaximumPp.toLocaleString()}`,
                });
            }

            if (this.mission.beatmapEarliestSubmissionDate && (new Date(this.mission.beatmapEarliestSubmissionDate) > new Date('2007-09-17'))) {
                requirements.push({
                    text: `Your beatmap must be submitted to the osu! website `,
                    bold: `after ${new Date(this.mission.beatmapEarliestSubmissionDate).toLocaleString()}`,
                });
            }

            if (this.mission.beatmapLatestSubmissionDate && (new Date(this.mission.beatmapLatestSubmissionDate) < new Date('2050-01-01'))) {
                requirements.push({
                    text: `Your beatmap must be submitted to the osu! website `,
                    bold: `before ${new Date(this.mission.beatmapLatestSubmissionDate).toLocaleString()}`,
                });
            }

            if (this.mission.userMinimumRank) {
                let points = 0;

                switch (this.mission.userMinimumRank) {
                    case 1:
                        points = 100;
                        break;
                    case 2:
                        points = 250;
                        break;
                    case 3:
                        points = 500;
                        break;
                    case 4:
                        points = 1000;
                        break;
                    default:
                        break;
                }

                requirements.push({
                    text: `Your Mappers' Guild rank must be at least `,
                    bold: `${this.mission.userMinimumRank} (${points} total points)`,
                });
            }

            return requirements;
        },
    },
});
</script>

<style scoped>
.artist-avatar {
    max-width: 50px;
    max-height: 50px;
    object-fit: cover;
    border-radius: 10%;
    box-shadow: 0 1px 0.5rem rgb(10, 10, 25);
    background-color: rgb(10, 10, 25);
}
</style>
