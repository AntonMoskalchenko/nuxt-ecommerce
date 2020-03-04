export default async function ({ store, route }) {
  if (route.matched.length > 0) {
    await Promise.all(route.matched.map(async ({ name }) => {
      if (name === 'index') {
        await store.commit('RESET_BREADCRUMBS')
      }
    }))
  }
}
