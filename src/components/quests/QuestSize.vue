<template>
    <modal-dialog
        :key="quest.id"
        v-bs-tooltip="'Party size: ' +
            (
                quest.minParty == quest.maxParty ? `${quest.minParty} user${quest.maxParty == 1 ? '' : 's'}` :
                quest.status == 'open' ? `${quest.minParty}-${quest.maxParty} users` :
                (quest.status == 'wip' || quest.status == 'done') ? `${quest.currentParty.members.length} user${quest.currentParty.members.length == 1 ? '' : 's'}` : ''
            )"
        class="small pe-2"
    >
        <span v-if="quest.status == 'open'">
            <i v-for="i in quest.minParty" :key="i" class="fas fa-user user-icon" />
            <i
                v-for="i in quest.maxParty - quest.minParty"
                :key="i+100"
                class="fas text-secondary fa-user user-icon"
            />
        </span>

        <span v-else-if="quest.status == 'wip' || quest.status == 'done'">
            <i v-for="member in quest.currentParty.members" :key="member.id" class="fas fa-user user-icon" />
        </span>
    </modal-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Quest } from '@interfaces/quest';

export default defineComponent({
    name: 'QuestSize',
    props: {
        quest: {
            type: Object as () => Quest,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped>

.user-icon {
    margin: 0 1px;
}

</style>
