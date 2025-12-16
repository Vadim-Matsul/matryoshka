import { RestaurantPlaceKeys } from '@/configs/places';

export enum PlacesModalNextSteps {
  BAR_MENU = 'BAR_MENU',
  MAIN_MENU = 'MAIN_MENU',
  DYM = 'DYM',
}

export const brone_table_config = {
  [PlacesModalNextSteps.MAIN_MENU]: {
    images: [
      '/images/menu/menu_1.webp',
      '/images/menu/menu_2.webp',
      '/images/menu/menu_3.webp',
      '/images/menu/menu_4.webp',
      '/images/menu/menu_5.webp',
      '/images/menu/menu_6.webp',
      '/images/menu/menu_7.webp',
    ],
  },
};
