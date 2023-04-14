export type Item = {
  name: string
  slug: string
  description?: string
}

export const sidebar: { name: string; items: Item[] }[] = [
  {
    name: 'Dashboard',
    items: [
      {
        name: 'Dashboard',
        slug: 'dashboard',
        description: 'Dashboard',
      },
      // {
      //   name: 'Devices',
      //   slug: 'device',
      //   description: 'Device',
      // },
    ],
  },
]
