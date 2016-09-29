import { SLIDES }         from '../../mock/slides';
import { WELCOME_SLIDES } from '../../mock/welcome-slides';
import { CATEGORY_CARDS } from '../../mock/category-cards';
import { WISHLISTS }      from '../../mock/wishlists';
import { JOURNEYS }       from '../../mock/journeys';

import { Injectable } from '@angular/core';

@Injectable()
export class MockService {
  getSlides(): Promise<any[]> {
    return new Promise((resolve, reject) => resolve(SLIDES));
  }

  getWelcomeSlides(): Promise<any[]> {
    return new Promise((resolve, reject) => resolve(WELCOME_SLIDES));
  }

  getCategoryCards(): Promise<any[]> {
    return new Promise((resolve, reject) => resolve(CATEGORY_CARDS));
  }

  getWishlists(): Promise<any[]> {
    return new Promise((resolve, reject) => resolve(WISHLISTS));
  }
  
  getJourneyById(id): Promise<any[]> {
    return new Promise((resolve, reject) => resolve(JOURNEYS));
  }
}
