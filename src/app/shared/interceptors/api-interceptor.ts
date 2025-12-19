import { HttpInterceptorFn } from '@angular/common/http';

const BASE_URL = 'http://localhost:3000';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('http')) {
    return next(req);
  }
  const apiReq = req.clone({
    url: '${BASE_URL}${req.url}'
  }); // додали базовий URL
  return next(apiReq);
};
