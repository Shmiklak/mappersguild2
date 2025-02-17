<template>
    <modal-dialog
        :id="`editUser${currentGroup}`"
        :header-class="user ? 'bg-rank-' + user.rank : ''"
        :loaded="Boolean(user)"
    >
        <template #header>
            <user-link :user="user" />
        </template>

        <template #default>
            <div class="container">
                <p class="row">
                    <select v-model="group" class="form-select form-select-sm w-50 mx-2">
                        <option value="user">
                            User
                        </option>
                        <option value="admin">
                            Admin
                        </option>
                        <option value="secret">
                            Secret
                        </option>
                    </select>
                    <button class="btn btn-sm btn-outline-info w-25" @click="updateGroup($event)">
                        Save group
                    </button>
                </p>
                <p class="row">
                    <input
                        v-model="queuedBadge"
                        class="form-control form-control-sm mx-2 w-50"
                        type="text"
                        autocomplete="off"
                    />
                    <button class="btn btn-sm btn-outline-info w-25" @click="updateQueuedBadge($event)">
                        Queue badge
                    </button>
                </p>
                <p class="row">
                    <input
                        v-model="badge"
                        class="form-control form-control-sm mx-2 w-50"
                        type="text"
                        autocomplete="off"
                    />
                    <button class="btn btn-sm btn-outline-info w-25" @click="updateBadge($event)">
                        Update actual badge
                    </button>
                </p>
                <p class="row">
                    <input
                        v-model="discordId"
                        class="form-control form-control-sm mx-2 w-50"
                        type="text"
                        autocomplete="off"
                    />
                    <button class="btn btn-sm btn-outline-info w-25" @click="updateDiscordId($event)">
                        Save Discord ID
                    </button>
                </p>
                <p>
                    <button class="btn btn-sm btn-outline-info w-100" @click="calculateUserPoints($event)">
                        Calculate user points
                    </button>
                </p>
                <p>
                    <button class="btn btn-sm btn-outline-info w-100" @click="toggleIsShowcaseMapper($event)">
                        {{ user.isShowcaseMapper ? 'Disable' : 'Enable' }} isShowcaseMapper
                    </button>
                </p>
                <p>
                    <button class="btn btn-sm btn-outline-info w-100" @click="toggleIsMentorshipAdmin($event)">
                        {{ user.isMentorshipAdmin ? 'Disable' : 'Enable' }} isMentorshipAdmin
                    </button>
                </p>
                <p>
                    <button class="btn btn-sm btn-outline-info w-100" @click="toggleHasMerchAccess($event)">
                        {{ user.hasMerchAccess ? 'Disable' : 'Enable' }} hasMerchAccess
                    </button>
                </p>
            </div>
        </template>
    </modal-dialog>
</template>

<script lang="ts">
import ModalDialog from '@components/ModalDialog.vue';
import { defineComponent } from 'vue';
import { User } from '../../../interfaces/user';

export default defineComponent({
    name: 'UserInfo',
    components: {
        ModalDialog,
    },
    props: {
        user: {
            type: Object as () => User,
            default: null,
        },
        currentGroup: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            badge: 0,
            queuedBadge: 0,
            discordId: '',
            group: '',
        };
    },
    watch: {
        user(): void {
            this.badge = this.user.badge || 0;
            this.queuedBadge = this.user.queuedBadge || 0;
            this.discordId = this.user.discordId || '';
            this.group = this.user.group || '';
        },
    },
    created() {
        if (this.user) {
            this.badge = this.user.badge || 0;
            this.queuedBadge = this.user.badge || 0;
            this.discordId = this.user.discordId || '';
            this.group = this.user.group || '';
        }
    },
    methods: {
        async updateGroup(e): Promise<void> {
            const group = await this.$http.executePost(`/admin/users/${this.user.id}/updateGroup`, { group: this.group }, e);

            if (group) {
                this.$store.dispatch('updateToastMessages', {
                    message: `set group to ${group}`,
                    type: 'info',
                });
                this.$store.commit('updateGroup', {
                    userId: this.user.id,
                    group,
                });
            }
        },
        async updateQueuedBadge(e): Promise<void> {
            const badge = await this.$http.executePost(`/admin/users/${this.user.id}/updateQueuedBadge`, { badge: this.queuedBadge }, e);

            if (badge) {
                this.$store.dispatch('updateToastMessages', {
                    message: `set queued badge to ${badge}`,
                    type: 'info',
                });
                this.$store.commit('updateQueuedBadge', {
                    userId: this.user.id,
                    badge,
                });
            }
        },
        async updateBadge(e): Promise<void> {
            const badge = await this.$http.executePost(`/admin/users/${this.user.id}/updateBadge`, { badge: this.badge }, e);

            if (badge) {
                this.$store.dispatch('updateToastMessages', {
                    message: `set actual badge to ${badge}`,
                    type: 'info',
                });
                this.$store.commit('updateBadge', {
                    userId: this.user.id,
                    badge,
                });
            }
        },
        async updateDiscordId(e): Promise<void> {
            const discordId = await this.$http.executePost(`/admin/users/${this.user.id}/updateDiscordId`, { discordId: this.discordId }, e);

            if (discordId) {
                this.$store.dispatch('updateToastMessages', {
                    message: `set discord ID to ${discordId}`,
                    type: 'info',
                });
                this.$store.commit('updateDiscordId', {
                    userId: this.user.id,
                    discordId,
                });
            }
        },
        async calculateUserPoints(e): Promise<void> {
            const points = await this.$http.executePost(`/admin/users/${this.user.id}/calculateUserPoints`, {}, e);

            if (points) {
                this.$store.dispatch('updateToastMessages', {
                    message: `calculated points`,
                    type: 'info',
                });
            }
        },
        async toggleIsShowcaseMapper(e): Promise<void> {
            const res: any = await this.$http.executePost(`/admin/users/${this.user.id}/toggleIsShowcaseMapper`, { isShowcaseMapper: !this.user.isShowcaseMapper }, e);

            if (res) {
                this.$store.dispatch('updateToastMessages', {
                    message: `set isShowcaseMapper ${res.isShowcaseMapper}`,
                    type: 'info',
                });
                this.$store.commit('updateIsShowcaseMapper', {
                    userId: this.user.id,
                    isShowcaseMapper: res.isShowcaseMapper,
                });
            }
        },
        async toggleIsMentorshipAdmin(e): Promise<void> {
            const res: any = await this.$http.executePost(`/admin/users/${this.user.id}/toggleIsMentorshipAdmin`, { isMentorshipAdmin: !this.user.isMentorshipAdmin }, e);

            if (res) {
                this.$store.dispatch('updateToastMessages', {
                    message: `set isMentorshipAdmin ${res.isMentorshipAdmin}`,
                    type: 'info',
                });
                this.$store.commit('updateIsMentorshipAdmin', {
                    userId: this.user.id,
                    isMentorshipAdmin: res.isMentorshipAdmin,
                });
            }
        },
        async toggleHasMerchAccess(e): Promise<void> {
            const res: any = await this.$http.executePost(`/admin/users/${this.user.id}/toggleHasMerchAccess`, { hasMerchAccess: !this.user.hasMerchAccess }, e);

            if (res) {
                this.$store.dispatch('updateToastMessages', {
                    message: `set hasMerchAccess ${res.hasMerchAccess}`,
                    type: 'info',
                });
                this.$store.commit('updateHasMerchAccess', {
                    userId: this.user.id,
                    hasMerchAccess: res.hasMerchAccess,
                });
            }
        },
    },
});
</script>