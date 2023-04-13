import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable} from 'rxjs';
import { ICanDeactivate as CD } from '../model/CanDeactivate '

@Injectable({
  providedIn: 'root'
})
export class ConfirmExitGuard implements CanDeactivate<CD> {
  canDeactivate(
    component: CD,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return  component.desativarGuard ? component.desativarGuard() : true;
  }

}
