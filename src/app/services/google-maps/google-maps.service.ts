import {Injectable,NgZone} from "@angular/core";
import {GoogleMapsAPIWrapper} from "@agm/core";
import {MapsAPILoader} from "@agm/core";
import {Observable,Observer} from "rxjs";

declare var google: any;

@Injectable()
export class GoogleMapsService {
  constructor(private __loader: MapsAPILoader){

  }
  getLatLng(address:string): Observable<any>{
    return Observable.create(observer=> {
      this.__loader.load().then(() => {
        let geocoder = new google.maps.Geocoder();
        geocoder.geocode({address}, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            observer.next(results[0].geometry.location);
            observer.complete();
          } else {
            observer.error(new Error(`Error of getting map:${status}`));
          }
         });
        });
    });


  }
}
