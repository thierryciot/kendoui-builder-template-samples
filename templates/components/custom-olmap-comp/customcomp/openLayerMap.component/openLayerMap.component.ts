import {Component, Input, OnInit, OnChanges, ViewChild} from '@angular/core';

declare var ol: any;

/*
It assumes the OL CSS and JS are already included in application:

<link rel="stylesheet" href="https://openlayers.org/en/v4.6.5/css/ol.css" type="text/css">
<script src="https://openlayers.org/en/v4.6.5/build/ol.js" type="text/javascript"></script>

See http://openlayers.org/en/latest/doc/quickstart.html

We add these in KUIB project in app properties, head: See https://www.telerik.com/kendo-ui-builder/documentation/extension-points/extending-head/
 */
@Component({
    selector: 'custom-olmap',
    templateUrl: './openLayerMap.component.html',
    styleUrls: ['./openLayerMap.component.css']
})
export class OpenLayerMap implements OnInit, OnChanges {
    @Input() lon: number;
    @Input() lat: number;
    @Input() componentId: string;
    // @ViewChild('olMapTag') olMapEl: any;
    @Input() height: string;
    @Input() marginBottom: string;
    @Input() marginTop: string;
    @Input() marginLeft: string;
    @Input() marginRight: string;

    openLayerMap: any;
    olView: any;

    // Set it to true to output debug data in the component itself.
    // debugComp = true;

    constructor() {
    }

    ngOnInit() {
        // debugger;
        if (this.lon === undefined) {
            this.lon = 0;
        }
        if (this.lat === undefined) {
            this.lat = 45;
        }

        this.height += 'px';
        this.marginTop += 'px';
        this.marginBottom += 'px';
        this.marginRight += 'px';
        this.marginLeft += 'px';

        // const mapElId = this.olMapEl.nativeElement.id;
        // console.log(`ngOnInit: Map container element ID: ${this.componentId} `);
    }

    ngOnChanges() {
        console.log(`ngOnChanges ${this.lat} ${this.lon}`);

        if ( this.lat === undefined || this.lon === undefined )
        {
            console.log ("No coordinates");
            return;
        }

        // debugger;

        // const washingtonLonLat = [-77.036667, 38.895];
        // const washingtonWebMercator = ol.proj.fromLonLat(washingtonLonLat);

        const lonLat = [this.lon, this.lat];
        const coordWebMercator = ol.proj.fromLonLat(lonLat);
        const zoom = 10;


        // to temporarily remove a map need to call map.setTarget(null);
        if ( this.openLayerMap === undefined ) {
            const olView = new ol.View({
                center: coordWebMercator,
                zoom: zoom
            });

            this.openLayerMap = new ol.Map({
                target: this.componentId,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: olView
            });

            this.olView = olView;
        }
        else {
            this.olView.setCenter (coordWebMercator, zoom);
        }
    }
}