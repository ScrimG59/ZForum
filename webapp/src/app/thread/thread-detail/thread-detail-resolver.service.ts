import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThreadService } from 'src/services/thread.service';

@Injectable({
  providedIn: 'root'
})
export class ThreadDetailResolverService implements Resolve<any> {
  constructor(private threadService: ThreadService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const threadId = route.params['id'];
    return this.threadService.getThreadById(threadId).pipe(
      catchError(error => {
        return of(null);
      })
    );
  }
}
