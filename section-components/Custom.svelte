<script lang="ts" module>
  export type Config = {
    type: 'Custom'
    value: string
  }
</script>

<script lang="ts">
  const { config }: { config: Config } = $props()
</script>

<div class="bg-red-500">{config.value}</div>
