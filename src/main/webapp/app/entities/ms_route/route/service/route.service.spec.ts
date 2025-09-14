import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IRoute } from '../route.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../route.test-samples';

import { RestRoute, RouteService } from './route.service';

const requireRestSample: RestRoute = {
  ...sampleWithRequiredData,
  createdAt: sampleWithRequiredData.createdAt?.toJSON(),
  updatedAt: sampleWithRequiredData.updatedAt?.toJSON(),
};

describe('Route Service', () => {
  let service: RouteService;
  let httpMock: HttpTestingController;
  let expectedResult: IRoute | IRoute[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(RouteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Route', () => {
      const route = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(route).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Route', () => {
      const route = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(route).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Route', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Route', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Route', () => {
      const expected = true;

      service.delete('9fec3727-3421-4967-b213-ba36557ca194').subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    it('should handle exceptions for searching a Route', () => {
      const queryObject: any = {
        page: 0,
        size: 20,
        query: '',
        sort: [],
      };
      service.search(queryObject).subscribe(() => expectedResult);

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
      expect(expectedResult).toBe(null);
    });

    describe('addRouteToCollectionIfMissing', () => {
      it('should add a Route to an empty array', () => {
        const route: IRoute = sampleWithRequiredData;
        expectedResult = service.addRouteToCollectionIfMissing([], route);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(route);
      });

      it('should not add a Route to an array that contains it', () => {
        const route: IRoute = sampleWithRequiredData;
        const routeCollection: IRoute[] = [
          {
            ...route,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRouteToCollectionIfMissing(routeCollection, route);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Route to an array that doesn't contain it", () => {
        const route: IRoute = sampleWithRequiredData;
        const routeCollection: IRoute[] = [sampleWithPartialData];
        expectedResult = service.addRouteToCollectionIfMissing(routeCollection, route);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(route);
      });

      it('should add only unique Route to an array', () => {
        const routeArray: IRoute[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const routeCollection: IRoute[] = [sampleWithRequiredData];
        expectedResult = service.addRouteToCollectionIfMissing(routeCollection, ...routeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const route: IRoute = sampleWithRequiredData;
        const route2: IRoute = sampleWithPartialData;
        expectedResult = service.addRouteToCollectionIfMissing([], route, route2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(route);
        expect(expectedResult).toContain(route2);
      });

      it('should accept null and undefined values', () => {
        const route: IRoute = sampleWithRequiredData;
        expectedResult = service.addRouteToCollectionIfMissing([], null, route, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(route);
      });

      it('should return initial array if no Route is added', () => {
        const routeCollection: IRoute[] = [sampleWithRequiredData];
        expectedResult = service.addRouteToCollectionIfMissing(routeCollection, undefined, null);
        expect(expectedResult).toEqual(routeCollection);
      });
    });

    describe('compareRoute', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRoute(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: '49e2c511-948a-4381-a293-ae53a33bea8e' };
        const entity2 = null;

        const compareResult1 = service.compareRoute(entity1, entity2);
        const compareResult2 = service.compareRoute(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: '49e2c511-948a-4381-a293-ae53a33bea8e' };
        const entity2 = { id: 'b1c399a0-817d-4c04-ae0b-b97422c251aa' };

        const compareResult1 = service.compareRoute(entity1, entity2);
        const compareResult2 = service.compareRoute(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: '49e2c511-948a-4381-a293-ae53a33bea8e' };
        const entity2 = { id: '49e2c511-948a-4381-a293-ae53a33bea8e' };

        const compareResult1 = service.compareRoute(entity1, entity2);
        const compareResult2 = service.compareRoute(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
