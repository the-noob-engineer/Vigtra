<script lang="ts">
  import type { ComponentType } from 'svelte';

  interface Activity {
    id: string;
    type: string;
    message: string;
    time: string;
    icon: ComponentType;
    iconColor: string;
  }

  export let activities: Activity[];
</script>

<div class="space-y-4">
  {#each activities as activity}
    <div class="flex items-start space-x-3">
      <div class="flex-shrink-0">
        <svelte:component this={activity.icon} class="h-5 w-5 {activity.iconColor}" />
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm text-gray-900">{activity.message}</p>
        <p class="text-xs text-gray-500">{activity.time}</p>
      </div>
    </div>
  {/each}
  
  <div class="mt-6 pt-4 border-t border-gray-200">
    <a href="/activity" class="text-sm font-medium text-primary-600 hover:text-primary-700">
      View all activity →
    </a>
  </div>
</div>