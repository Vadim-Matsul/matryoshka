import { RestaurantPlaceKeys } from '@/configs/places';

export enum PlacesModalNextSteps {
  BAR_MENU = 'BAR_MENU',
  MAIN_MENU = 'MAIN_MENU',
  DYM = 'DYM',
}

export const brone_table_config = {
  [PlacesModalNextSteps.MAIN_MENU]: {
    images: [
      '/images/menus/main_menu/red_october/1.webp',
      '/images/menus/main_menu/red_october/2.webp',
      '/images/menus/main_menu/red_october/3.webp',
      '/images/menus/main_menu/red_october/4.webp',
      '/images/menus/main_menu/red_october/5.webp',
    ],
  },
  [PlacesModalNextSteps.BAR_MENU]: {
    images: [
      '/images/menus/bar_menu/red_october/1.webp',
      '/images/menus/bar_menu/red_october/2.webp',
      '/images/menus/bar_menu/red_october/3.webp',
      '/images/menus/bar_menu/red_october/4.webp',
      '/images/menus/bar_menu/red_october/5.webp',
      '/images/menus/bar_menu/red_october/6.webp',
      '/images/menus/bar_menu/red_october/7.webp',
      '/images/menus/bar_menu/red_october/8.webp',
      '/images/menus/bar_menu/red_october/9.webp',
    ],
  },
  [PlacesModalNextSteps.DYM]: {
    images: ['/images/menus/special/khamovniki/1.webp'],
  },
};
