import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, asapScheduler, map, scheduled } from 'rxjs';

import { catchError } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IRoute, NewRoute } from '../route.model';

export type PartialUpdateRoute = Partial<IRoute> & Pick<IRoute, 'id'>;

type RestOf<T extends IRoute | NewRoute> = Omit<T, 'createdAt' | 'updatedAt'> & {
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type RestRoute = RestOf<IRoute>;

export type NewRestRoute = RestOf<NewRoute>;

export type PartialUpdateRestRoute = RestOf<PartialUpdateRoute>;

export type EntityResponseType = HttpResponse<IRoute>;
export type EntityArrayResponseType = HttpResponse<IRoute[]>;

@Injectable({ providedIn: 'root' })
export class RouteService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/routes', 'ms_route');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/routes/_search', 'ms_route');

  create(route: NewRoute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(route);
    return this.http.post<RestRoute>(this.resourceUrl, copy, { observe: 'response' }).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(route: IRoute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(route);
    return this.http
      .put<RestRoute>(`${this.resourceUrl}/${this.getRouteIdentifier(route)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(route: PartialUpdateRoute): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(route);
    return this.http
      .patch<RestRoute>(`${this.resourceUrl}/${this.getRouteIdentifier(route)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<RestRoute>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestRoute[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<RestRoute[]>(this.resourceSearchUrl, { params: options, observe: 'response' }).pipe(
      map(res => this.convertResponseArrayFromServer(res)),

      catchError(() => scheduled([new HttpResponse<IRoute[]>()], asapScheduler)),
    );
  }

  getRouteIdentifier(route: Pick<IRoute, 'id'>): string {
    return route.id;
  }

  compareRoute(o1: Pick<IRoute, 'id'> | null, o2: Pick<IRoute, 'id'> | null): boolean {
    return o1 && o2 ? this.getRouteIdentifier(o1) === this.getRouteIdentifier(o2) : o1 === o2;
  }

  addRouteToCollectionIfMissing<Type extends Pick<IRoute, 'id'>>(
    routeCollection: Type[],
    ...routesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const routes: Type[] = routesToCheck.filter(isPresent);
    if (routes.length > 0) {
      const routeCollectionIdentifiers = routeCollection.map(routeItem => this.getRouteIdentifier(routeItem));
      const routesToAdd = routes.filter(routeItem => {
        const routeIdentifier = this.getRouteIdentifier(routeItem);
        if (routeCollectionIdentifiers.includes(routeIdentifier)) {
          return false;
        }
        routeCollectionIdentifiers.push(routeIdentifier);
        return true;
      });
      return [...routesToAdd, ...routeCollection];
    }
    return routeCollection;
  }

  protected convertDateFromClient<T extends IRoute | NewRoute | PartialUpdateRoute>(route: T): RestOf<T> {
    return {
      ...route,
      createdAt: route.createdAt?.toJSON() ?? null,
      updatedAt: route.updatedAt?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restRoute: RestRoute): IRoute {
    return {
      ...restRoute,
      createdAt: restRoute.createdAt ? dayjs(restRoute.createdAt) : undefined,
      updatedAt: restRoute.updatedAt ? dayjs(restRoute.updatedAt) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestRoute>): HttpResponse<IRoute> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestRoute[]>): HttpResponse<IRoute[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
