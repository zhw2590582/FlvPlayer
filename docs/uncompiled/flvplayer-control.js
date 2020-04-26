(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.FlvplayerControl = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".flvplayer-container{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.flvplayer-container,.flvplayer-container *{-webkit-box-sizing:border-box;box-sizing:border-box}.flvplayer-container .flvplayer-icon{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;line-height:1.5;cursor:pointer}.flvplayer-container .flvplayer-icon svg{fill:#fff}.flvplayer-container .flvplayer-player{position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;width:100%;height:100%}.flvplayer-container .flvplayer-player .flvplayer-canvas{cursor:pointer;width:100%;height:100%;background-color:#000}.flvplayer-container .flvplayer-player .flvplayer-poster{position:absolute;z-index:10;left:0;top:0;right:0;bottom:0;height:100%;width:100%;background-position:50%;background-repeat:no-repeat;background-size:contain;pointer-events:none}.flvplayer-container .flvplayer-player .flvplayer-loading{display:none;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:absolute;z-index:20;left:0;top:0;right:0;bottom:0;width:100%;height:100%;pointer-events:none}.flvplayer-container .flvplayer-player .flvplayer-controls{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;position:absolute;z-index:40;left:0;right:0;bottom:0;height:100px;padding:50px 10px 10px;font-size:14px;color:#fff;opacity:0;visibility:hidden;-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==) repeat-x bottom}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-item{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:0 7px}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-progress{position:relative;height:3px;border-radius:3px;background:hsla(0,0%,100%,.25)}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-progress .flvplayer-loaded{cursor:pointer;position:absolute;left:0;top:0;bottom:0;width:0;height:100%;border-radius:3px;background:hsla(0,0%,100%,.5)}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-progress .flvplayer-played{cursor:pointer;position:absolute;left:0;top:0;bottom:0;width:0;height:100%;border-radius:3px;background:#fff}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-progress .flvplayer-played .flvplayer-indicator{position:absolute;top:50%;right:0;width:12px;height:12px;margin:-6px -6px 0 0;border-radius:50%;background:#fff}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;height:22px;margin-top:15px}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-state{height:100%}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-state .flvplayer-pause{display:none}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume .flvplayer-volume-off{display:none}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume .flvplayer-volume-panel{position:relative;width:0;height:100%;-webkit-transition:margin .2s cubic-bezier(.4,0,1,1),width .2s cubic-bezier(.4,0,1,1);transition:margin .2s cubic-bezier(.4,0,1,1),width .2s cubic-bezier(.4,0,1,1);overflow:hidden}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume .flvplayer-volume-panel .flvplayer-volume-panel-handle{position:absolute;top:50%;left:0;width:12px;height:12px;border-radius:12px;margin-top:-6px;background:#fff}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume .flvplayer-volume-panel .flvplayer-volume-panel-handle:before{left:-54px;background:#fff}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume .flvplayer-volume-panel .flvplayer-volume-panel-handle:after{left:6px;background:hsla(0,0%,100%,.2)}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume .flvplayer-volume-panel .flvplayer-volume-panel-handle:after,.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume .flvplayer-volume-panel .flvplayer-volume-panel-handle:before{content:\"\";position:absolute;display:block;top:50%;height:3px;margin-top:-2px;width:60px}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-left .flvplayer-volume:hover .flvplayer-volume-panel{width:60px;margin-left:5px}.flvplayer-container .flvplayer-player .flvplayer-controls .flvplayer-controls-bottom .flvplayer-controls-right{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.flvplayer-container .flvplayer-player.flvplayer-loading-show .flvplayer-loading{display:-webkit-box;display:-ms-flexbox;display:flex}.flvplayer-container .flvplayer-player.flvplayer-controls-show .flvplayer-controls{opacity:1;visibility:visible}.flvplayer-container .flvplayer-player.flvplayer-hide-cursor *{cursor:none!important}.flvplayer-container.flvplayer-fullscreen-web{position:fixed;z-index:9999;left:0;top:0;right:0;bottom:0;width:100%!important;height:100%!important;background:#000}\n/*# sourceMappingURL=data:application/json;base64,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QixDQUNsQiwrR0FDRSxtQkFBYSxDQUFiLG1CQUFhLENBQWIsWUFBYSxDQUNiLHdCQUFtQixDQUFuQixxQkFBbUIsQ0FBbkIsa0JBQXFCLENBQ3JCLGdJQUNFLFdBQWMsQ0FDZCxpSkFDRSxZQUFlLENBQ25CLGlJQUNFLG1CQUFhLENBQWIsbUJBQWEsQ0FBYixZQUFhLENBQ2IsV0FBYyxDQUNkLHVKQUNFLFlBQWUsQ0FDakIseUpBQ0UsaUJBQWtCLENBQ2xCLE9BQVEsQ0FDUixXQUFZLENBQ1oscUZBQXlGLENBQXpGLDZFQUF5RixDQUN6RixlQUFrQixDQUNsQix3TEFDRSxpQkFBa0IsQ0FDbEIsT0FBUSxDQUNSLE1BQU8sQ0FDUCxVQUFXLENBQ1gsV0FBWSxDQUNaLGtCQUFtQixDQUNuQixlQUFnQixDQUNoQixlQUFrQixDQUNsQiwrTEFDRSxVQUFXLENBQ1gsZUFBa0IsQ0FDcEIsOExBQ0UsUUFBUyxDQUNULDZCQUFzQyxDQUN4Qyw2WEFDRSxVQUFXLENBQ1gsaUJBQWtCLENBQ2xCLGFBQWMsQ0FDZCxPQUFRLENBQ1IsVUFBVyxDQUNYLGVBQWdCLENBQ2hCLFVBQWEsQ0FDbkIsK0pBQ0UsVUFBVyxDQUNYLGVBQWtCLENBQ3hCLGdIQUNFLG1CQUFhLENBQWIsbUJBQWEsQ0FBYixZQUFhLENBQ2Isd0JBQW1CLENBQW5CLHFCQUFtQixDQUFuQixrQkFBcUIsQ0FDM0IsaUZBQ0UsbUJBQWEsQ0FBYixtQkFBYSxDQUFiLFlBQWUsQ0FDakIsbUZBQ0UsU0FBVSxDQUNWLGtCQUFxQixDQUN2QiwrREFDRSxxQkFBeUIsQ0FDN0IsOENBQ0UsY0FBZSxDQUNmLFlBQWEsQ0FDYixNQUFPLENBQ1AsS0FBTSxDQUNOLE9BQVEsQ0FDUixRQUFTLENBQ1Qsb0JBQXNCLENBQ3RCLHFCQUF1QixDQUN2QixlQUFrQiIsImZpbGUiOiJzdHlsZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZsdnBsYXllci1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XG4gIC5mbHZwbGF5ZXItY29udGFpbmVyICoge1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cbiAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1pY29uIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XG4gICAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1pY29uIHN2ZyB7XG4gICAgICBmaWxsOiAjZmZmOyB9XG4gIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTsgfVxuICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY2FudmFzIHtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDsgfVxuICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItcG9zdGVyIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHotaW5kZXg6IDEwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHRvcDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICAgICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgICAgIGJhY2tncm91bmQtc2l6ZTogY29udGFpbjtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyB9XG4gICAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1wbGF5ZXIgLmZsdnBsYXllci1sb2FkaW5nIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB6LWluZGV4OiAyMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB0b3A6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IH1cbiAgICAuZmx2cGxheWVyLWNvbnRhaW5lciAuZmx2cGxheWVyLXBsYXllciAuZmx2cGxheWVyLWNvbnRyb2xzIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHotaW5kZXg6IDQwO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHJpZ2h0OiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgaGVpZ2h0OiAxMDBweDtcbiAgICAgIHBhZGRpbmc6IDUwcHggMTBweCAxMHB4O1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG4gICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFFQUFBREdDQVlBQUFBVCtPcUZBQUFBZGtsRVFWUW96NDJRUVE3QUlBZ0VGL1QvRCtrYnEvUldBbG5ReXlhekE0YW9BQjRGc0JTQS9iRmp1RjFFT0w3VmJySXJCdXVzbXJ0NFpaT1JmYjZlaGJXZG5SSEVJaUlUYUVVS2E1RUpxVWFrUlNhRVlCSlNDWTJkRXN0UVk3QXV4YWh3WEZydlptV2wycmg0SlowN3o5ZEx0ZXNmTmo1cTBGVTNBNU9iYndBQUFBQkpSVTVFcmtKZ2dnPT0pIHJlcGVhdC14IGJvdHRvbTsgfVxuICAgICAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1wbGF5ZXIgLmZsdnBsYXllci1jb250cm9scyAuZmx2cGxheWVyLWNvbnRyb2xzLWl0ZW0ge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgcGFkZGluZzogMCA3cHg7IH1cbiAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1wcm9ncmVzcyB7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfVxuICAgICAgICAuZmx2cGxheWVyLWNvbnRhaW5lciAuZmx2cGxheWVyLXBsYXllciAuZmx2cGxheWVyLWNvbnRyb2xzIC5mbHZwbGF5ZXItY29udHJvbHMtcHJvZ3Jlc3MgLmZsdnBsYXllci1sb2FkZWQge1xuICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgIHdpZHRoOiAwO1xuICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpOyB9XG4gICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1wcm9ncmVzcyAuZmx2cGxheWVyLXBsYXllZCB7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHRvcDogMDtcbiAgICAgICAgICBib3R0b206IDA7XG4gICAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsgfVxuICAgICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1wcm9ncmVzcyAuZmx2cGxheWVyLXBsYXllZCAuZmx2cGxheWVyLWluZGljYXRvciB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgd2lkdGg6IDEycHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEycHg7XG4gICAgICAgICAgICBtYXJnaW46IC02cHggLTZweCAwIDA7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsgfVxuICAgICAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1wbGF5ZXIgLmZsdnBsYXllci1jb250cm9scyAuZmx2cGxheWVyLWNvbnRyb2xzLWJvdHRvbSB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgaGVpZ2h0OiAyMnB4O1xuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4OyB9XG4gICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1ib3R0b20gLmZsdnBsYXllci1jb250cm9scy1sZWZ0IHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cbiAgICAgICAgICAuZmx2cGxheWVyLWNvbnRhaW5lciAuZmx2cGxheWVyLXBsYXllciAuZmx2cGxheWVyLWNvbnRyb2xzIC5mbHZwbGF5ZXItY29udHJvbHMtYm90dG9tIC5mbHZwbGF5ZXItY29udHJvbHMtbGVmdCAuZmx2cGxheWVyLXN0YXRlIHtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTsgfVxuICAgICAgICAgICAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1wbGF5ZXIgLmZsdnBsYXllci1jb250cm9scyAuZmx2cGxheWVyLWNvbnRyb2xzLWJvdHRvbSAuZmx2cGxheWVyLWNvbnRyb2xzLWxlZnQgLmZsdnBsYXllci1zdGF0ZSAuZmx2cGxheWVyLXBhdXNlIHtcbiAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTsgfVxuICAgICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1ib3R0b20gLmZsdnBsYXllci1jb250cm9scy1sZWZ0IC5mbHZwbGF5ZXItdm9sdW1lIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7IH1cbiAgICAgICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1ib3R0b20gLmZsdnBsYXllci1jb250cm9scy1sZWZ0IC5mbHZwbGF5ZXItdm9sdW1lIC5mbHZwbGF5ZXItdm9sdW1lLW9mZiB7XG4gICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7IH1cbiAgICAgICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1ib3R0b20gLmZsdnBsYXllci1jb250cm9scy1sZWZ0IC5mbHZwbGF5ZXItdm9sdW1lIC5mbHZwbGF5ZXItdm9sdW1lLXBhbmVsIHtcbiAgICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBtYXJnaW4gMC4ycyBjdWJpYy1iZXppZXIoMC40LCAwLCAxLCAxKSwgd2lkdGggMC4ycyBjdWJpYy1iZXppZXIoMC40LCAwLCAxLCAxKTtcbiAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxuICAgICAgICAgICAgICAuZmx2cGxheWVyLWNvbnRhaW5lciAuZmx2cGxheWVyLXBsYXllciAuZmx2cGxheWVyLWNvbnRyb2xzIC5mbHZwbGF5ZXItY29udHJvbHMtYm90dG9tIC5mbHZwbGF5ZXItY29udHJvbHMtbGVmdCAuZmx2cGxheWVyLXZvbHVtZSAuZmx2cGxheWVyLXZvbHVtZS1wYW5lbCAuZmx2cGxheWVyLXZvbHVtZS1wYW5lbC1oYW5kbGUge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgICAgICB0b3A6IDUwJTtcbiAgICAgICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMnB4O1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTJweDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbi10b3A6IC02cHg7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjsgfVxuICAgICAgICAgICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1ib3R0b20gLmZsdnBsYXllci1jb250cm9scy1sZWZ0IC5mbHZwbGF5ZXItdm9sdW1lIC5mbHZwbGF5ZXItdm9sdW1lLXBhbmVsIC5mbHZwbGF5ZXItdm9sdW1lLXBhbmVsLWhhbmRsZTo6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IC01NHB4O1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjsgfVxuICAgICAgICAgICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1ib3R0b20gLmZsdnBsYXllci1jb250cm9scy1sZWZ0IC5mbHZwbGF5ZXItdm9sdW1lIC5mbHZwbGF5ZXItdm9sdW1lLXBhbmVsIC5mbHZwbGF5ZXItdm9sdW1lLXBhbmVsLWhhbmRsZTo6YWZ0ZXIge1xuICAgICAgICAgICAgICAgICAgbGVmdDogNnB4O1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpOyB9XG4gICAgICAgICAgICAgICAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1wbGF5ZXIgLmZsdnBsYXllci1jb250cm9scyAuZmx2cGxheWVyLWNvbnRyb2xzLWJvdHRvbSAuZmx2cGxheWVyLWNvbnRyb2xzLWxlZnQgLmZsdnBsYXllci12b2x1bWUgLmZsdnBsYXllci12b2x1bWUtcGFuZWwgLmZsdnBsYXllci12b2x1bWUtcGFuZWwtaGFuZGxlOjpiZWZvcmUsIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1ib3R0b20gLmZsdnBsYXllci1jb250cm9scy1sZWZ0IC5mbHZwbGF5ZXItdm9sdW1lIC5mbHZwbGF5ZXItdm9sdW1lLXBhbmVsIC5mbHZwbGF5ZXItdm9sdW1lLXBhbmVsLWhhbmRsZTo6YWZ0ZXIge1xuICAgICAgICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgICAgICAgIHRvcDogNTAlO1xuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAzcHg7XG4gICAgICAgICAgICAgICAgICBtYXJnaW4tdG9wOiAtMnB4O1xuICAgICAgICAgICAgICAgICAgd2lkdGg6IDYwcHg7IH1cbiAgICAgICAgICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyIC5mbHZwbGF5ZXItY29udHJvbHMgLmZsdnBsYXllci1jb250cm9scy1ib3R0b20gLmZsdnBsYXllci1jb250cm9scy1sZWZ0IC5mbHZwbGF5ZXItdm9sdW1lOmhvdmVyIC5mbHZwbGF5ZXItdm9sdW1lLXBhbmVsIHtcbiAgICAgICAgICAgICAgd2lkdGg6IDYwcHg7XG4gICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7IH1cbiAgICAgICAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1wbGF5ZXIgLmZsdnBsYXllci1jb250cm9scyAuZmx2cGxheWVyLWNvbnRyb2xzLWJvdHRvbSAuZmx2cGxheWVyLWNvbnRyb2xzLXJpZ2h0IHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cbiAgICAuZmx2cGxheWVyLWNvbnRhaW5lciAuZmx2cGxheWVyLXBsYXllci5mbHZwbGF5ZXItbG9hZGluZy1zaG93IC5mbHZwbGF5ZXItbG9hZGluZyB7XG4gICAgICBkaXNwbGF5OiBmbGV4OyB9XG4gICAgLmZsdnBsYXllci1jb250YWluZXIgLmZsdnBsYXllci1wbGF5ZXIuZmx2cGxheWVyLWNvbnRyb2xzLXNob3cgLmZsdnBsYXllci1jb250cm9scyB7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTsgfVxuICAgIC5mbHZwbGF5ZXItY29udGFpbmVyIC5mbHZwbGF5ZXItcGxheWVyLmZsdnBsYXllci1oaWRlLWN1cnNvciAqIHtcbiAgICAgIGN1cnNvcjogbm9uZSAhaW1wb3J0YW50OyB9XG4gIC5mbHZwbGF5ZXItY29udGFpbmVyLmZsdnBsYXllci1mdWxsc2NyZWVuLXdlYiB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDk5OTk7XG4gICAgbGVmdDogMDtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZDogIzAwMDsgfVxuIl19 */";
  styleInject(css_248z);

  var play = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n  <path d=\"M17.982 9.275L8.06 3.27A2.013 2.013 0 0 0 5 4.994v12.011a2.017 2.017 0 0 0 3.06 1.725l9.922-6.005a2.017 2.017 0 0 0 0-3.45z\"></path>\n</svg>";

  var pause = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M7 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zM15 3a2 2 0 0 0-2 2v12a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2z\"></path>\n</svg>";

  var volume = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M10.188 4.65L6 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39V5.04a.498.498 0 0 0-.812-.39zM14.446 3.778a1 1 0 0 0-.862 1.804 6.002 6.002 0 0 1-.007 10.838 1 1 0 0 0 .86 1.806A8.001 8.001 0 0 0 19 11a8.001 8.001 0 0 0-4.554-7.222z\"></path>\n    <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v6.93A3.998 3.998 0 0 0 15 11z\"></path>\n</svg>";

  var volumeClose = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"22\" width=\"22\" viewBox=\"0 0 22 22\">\n    <path d=\"M15 11a3.998 3.998 0 0 0-2-3.465v2.636l1.865 1.865A4.02 4.02 0 0 0 15 11z\"></path>\n    <path d=\"M13.583 5.583A5.998 5.998 0 0 1 17 11a6 6 0 0 1-.585 2.587l1.477 1.477a8.001 8.001 0 0 0-3.446-11.286 1 1 0 0 0-.863 1.805zM18.778 18.778l-2.121-2.121-1.414-1.414-1.415-1.415L13 13l-2-2-3.889-3.889-3.889-3.889a.999.999 0 1 0-1.414 1.414L5.172 8H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1l4.188 3.35a.5.5 0 0 0 .812-.39v-3.131l2.587 2.587-.01.005a1 1 0 0 0 .86 1.806c.215-.102.424-.214.627-.333l2.3 2.3a1.001 1.001 0 0 0 1.414-1.416zM11 5.04a.5.5 0 0 0-.813-.39L8.682 5.854 11 8.172V5.04z\"></path>\n</svg>";

  var fullscreen = "<svg xmlns=\"http://www.w3.org/2000/svg\" height=\"36\" width=\"36\" viewBox=\"0 0 36 36\">\n\t<path d=\"m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z\"></path>\n\t<path d=\"m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z\"></path>\n\t<path d=\"m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z\"></path>\n\t<path d=\"M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z\"></path>\n</svg>";

  var loading = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"50px\" height=\"50px\" viewBox=\"0 0 100 100\" preserveAspectRatio=\"xMidYMid\" class=\"uil-default\">\n  <rect x=\"0\" y=\"0\" width=\"100\" height=\"100\" fill=\"none\" class=\"bk\"/>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(0 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-1s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(30 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.9166666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(60 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.8333333333333334s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(90 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.75s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(120 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.6666666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(150 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.5833333333333334s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(180 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.5s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(210 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.4166666666666667s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(240 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.3333333333333333s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(270 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.25s\" repeatCount=\"indefinite\"/></rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(300 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.16666666666666666s\" repeatCount=\"indefinite\"/>\n  </rect>\n  <rect x=\"47\" y=\"40\" width=\"6\" height=\"20\" rx=\"5\" ry=\"5\" fill=\"#ffffff\" transform=\"rotate(330 50 50) translate(0 -30)\">\n    <animate attributeName=\"opacity\" from=\"1\" to=\"0\" dur=\"1s\" begin=\"-0.08333333333333333s\" repeatCount=\"indefinite\"/>\n  </rect>\n</svg>";

  var iconsMap = {
    play: play,
    pause: pause,
    volume: volume,
    volumeClose: volumeClose,
    fullscreen: fullscreen,
    loading: loading
  };
  var icons = Object.keys(iconsMap).reduce(function (icons, key) {
    icons[key] = "<i class=\"flvplayer-icon flvplayer-icon-".concat(key, "\">").concat(iconsMap[key], "</i>");
    return icons;
  }, {});

  function template(flv, control) {
    var options = flv.options;
    flv.player.$player.classList.add('flvplayer-controls-show');

    if (options.live) {
      flv.player.$player.classList.add('flvplayer-live');
    }

    flv.player.$player.insertAdjacentHTML('beforeend', "\n        ".concat(options.poster ? "<div class=\"flvplayer-poster\" style=\"background-image: url(".concat(options.poster, ")\"></div>") : '', "\n            <div class=\"flvplayer-loading\">").concat(icons.loading, "</div>\n            <div class=\"flvplayer-controls\">\n                ").concat(!options.live ? "\n                    <div class=\"flvplayer-controls-progress\">\n                        <div class=\"flvplayer-loaded\"></div>\n                        <div class=\"flvplayer-played\">\n                            <div class=\"flvplayer-indicator\"></div>\n                        </div>\n                    </div>\n                " : '', "\n                <div class=\"flvplayer-controls-bottom\">\n                    <div class=\"flvplayer-controls-left\">\n                        <div class=\"flvplayer-controls-item flvplayer-state\">\n                            <div class=\"flvplayer-play\">").concat(icons.play, "</div>\n                            <div class=\"flvplayer-pause\">").concat(icons.pause, "</div>\n                        </div>\n                        ").concat(options.hasAudio ? "\n                            <div class=\"flvplayer-controls-item flvplayer-volume\">\n                                <div class=\"flvplayer-volume-on\">".concat(icons.volume, "</div>\n                                <div class=\"flvplayer-volume-off\">").concat(icons.volumeClose, "</div>\n                                ").concat(flv.isMobile ? '' : "\n                                    <div class=\"flvplayer-volume-panel\">\n                                        <div class=\"flvplayer-volume-panel-handle\"></div>\n                                    </div>\n                                ", "\n                            </div>\n                        ") : '', "\n                        ").concat(!options.live ? "\n                            <div class=\"flvplayer-controls-item flvplayer-time\">\n                                <span class=\"flvplayer-current\">00:00</span> / <span class=\"flvplayer-duration\">00:00</span>\n                            </div>\n                        " : '', "\n                    </div>\n                    <div class=\"flvplayer-controls-right\">\n                        <div class=\"flvplayer-controls-item flvplayer-fullscreen\">").concat(icons.fullscreen, "</div>\n                    </div>\n                </div>\n            </div>\n        "));
    Object.defineProperty(control, '$poster', {
      value: options.container.querySelector('.flvplayer-poster')
    });
    Object.defineProperty(control, '$loading', {
      value: options.container.querySelector('.flvplayer-loading')
    });
    Object.defineProperty(control, '$controls', {
      value: options.container.querySelector('.flvplayer-controls')
    });
    Object.defineProperty(control, '$state', {
      value: options.container.querySelector('.flvplayer-state')
    });
    Object.defineProperty(control, '$play', {
      value: options.container.querySelector('.flvplayer-play')
    });
    Object.defineProperty(control, '$pause', {
      value: options.container.querySelector('.flvplayer-pause')
    });
    Object.defineProperty(control, '$current', {
      value: options.container.querySelector('.flvplayer-current')
    });
    Object.defineProperty(control, '$duration', {
      value: options.container.querySelector('.flvplayer-duration')
    });
    Object.defineProperty(control, '$volumeOn', {
      value: options.container.querySelector('.flvplayer-volume-on')
    });
    Object.defineProperty(control, '$volumeOff', {
      value: options.container.querySelector('.flvplayer-volume-off')
    });
    Object.defineProperty(control, '$volumePanel', {
      value: options.container.querySelector('.flvplayer-volume-panel')
    });
    Object.defineProperty(control, '$volumeHandle', {
      value: options.container.querySelector('.flvplayer-volume-panel-handle')
    });
    Object.defineProperty(control, '$fullscreen', {
      value: options.container.querySelector('.flvplayer-fullscreen')
    });
    Object.defineProperty(control, '$progress', {
      value: options.container.querySelector('.flvplayer-controls-progress')
    });
    Object.defineProperty(control, '$loaded', {
      value: options.container.querySelector('.flvplayer-loaded')
    });
    Object.defineProperty(control, '$played', {
      value: options.container.querySelector('.flvplayer-played')
    });
    Object.defineProperty(control, '$indicator', {
      value: options.container.querySelector('.flvplayer-indicator')
    });
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  function secondToTime(second) {
    var add0 = function add0(num) {
      return num < 10 ? "0".concat(num) : String(num);
    };

    var hour = Math.floor(second / 3600);
    var min = Math.floor((second - hour * 3600) / 60);
    var sec = Math.floor(second - hour * 3600 - min * 60);
    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(':');
  }
  function debounce(func, wait, context) {
    var timeout;

    function fn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var later = function later() {
        timeout = null;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }

    fn.clearTimeout = function ct() {
      clearTimeout(timeout);
    };

    return fn;
  }
  function throttle(callback, delay) {
    var isThrottled = false;
    var args;
    var context;

    function fn() {
      for (var _len3 = arguments.length, args2 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args2[_key3] = arguments[_key3];
      }

      if (isThrottled) {
        args = args2;
        context = this;
        return;
      }

      isThrottled = true;
      callback.apply(this, args2);
      setTimeout(function () {
        isThrottled = false;

        if (args) {
          fn.apply(context, args);
          args = null;
          context = null;
        }
      }, delay);
    }

    return fn;
  }
  function clamp(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
  }
  function setStyle(element, key, value) {
    if (_typeof_1(key) === 'object') {
      Object.keys(key).forEach(function (item) {
        setStyle(element, item, key[item]);
      });
    }

    element.style[key] = value;
    return element;
  }
  function getStyle(element, key) {
    var numberType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var value = getComputedStyle(element, null).getPropertyValue(key);
    return numberType ? parseFloat(value) : value;
  }

  function observer(flv) {
    var proxy = flv.events.proxy,
        player = flv.player;
    var object = document.createElement('object');
    object.setAttribute('aria-hidden', 'true');
    object.setAttribute('tabindex', -1);
    object.type = 'text/html';
    object.data = 'about:blank';
    setStyle(object, {
      display: 'block',
      position: 'absolute',
      top: '0',
      left: '0',
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: '-1'
    });
    var playerWidth = player.width;
    var playerHeight = player.height;
    proxy(object, 'load', function () {
      proxy(object.contentDocument.defaultView, 'resize', function () {
        if (player.width !== playerWidth || player.height !== playerHeight) {
          playerWidth = player.width;
          playerHeight = player.height;
          flv.emit('resize');
        }
      });
    });
    player.$container.appendChild(object);
  }

  function hotkey(flv, control) {
    var proxy = flv.events.proxy,
        player = flv.player;
    var keys = {};

    function addHotkey(key, event) {
      if (keys[key]) {
        keys[key].push(event);
      } else {
        keys[key] = [event];
      }
    }

    addHotkey(27, function () {
      if (control.fullscreen) {
        player.fullscreen = false;
      }
    });
    addHotkey(32, function () {
      player.toggle();
    });
    addHotkey(37, function () {
      player.currentTime -= 5;
    });
    addHotkey(38, function () {
      player.volume += 0.1;
    });
    addHotkey(39, function () {
      player.currentTime += 5;
    });
    addHotkey(40, function () {
      player.volume -= 0.1;
    });
    proxy(window, 'keydown', function (event) {
      if (control.isFocus) {
        var tag = document.activeElement.tagName.toUpperCase();
        var editable = document.activeElement.getAttribute('contenteditable');

        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && editable !== '' && editable !== 'true') {
          var events = keys[event.keyCode];

          if (events) {
            event.preventDefault();
            events.forEach(function (fn) {
              return fn();
            });
          }
        }
      }
    });
  }

  var screenfull = createCommonjsModule(function (module) {
  /*!
  * screenfull
  * v5.0.2 - 2020-02-13
  * (c) Sindre Sorhus; MIT License
  */
  (function () {

  	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
  	var isCommonjs =  module.exports;

  	var fn = (function () {
  		var val;

  		var fnMap = [
  			[
  				'requestFullscreen',
  				'exitFullscreen',
  				'fullscreenElement',
  				'fullscreenEnabled',
  				'fullscreenchange',
  				'fullscreenerror'
  			],
  			// New WebKit
  			[
  				'webkitRequestFullscreen',
  				'webkitExitFullscreen',
  				'webkitFullscreenElement',
  				'webkitFullscreenEnabled',
  				'webkitfullscreenchange',
  				'webkitfullscreenerror'

  			],
  			// Old WebKit
  			[
  				'webkitRequestFullScreen',
  				'webkitCancelFullScreen',
  				'webkitCurrentFullScreenElement',
  				'webkitCancelFullScreen',
  				'webkitfullscreenchange',
  				'webkitfullscreenerror'

  			],
  			[
  				'mozRequestFullScreen',
  				'mozCancelFullScreen',
  				'mozFullScreenElement',
  				'mozFullScreenEnabled',
  				'mozfullscreenchange',
  				'mozfullscreenerror'
  			],
  			[
  				'msRequestFullscreen',
  				'msExitFullscreen',
  				'msFullscreenElement',
  				'msFullscreenEnabled',
  				'MSFullscreenChange',
  				'MSFullscreenError'
  			]
  		];

  		var i = 0;
  		var l = fnMap.length;
  		var ret = {};

  		for (; i < l; i++) {
  			val = fnMap[i];
  			if (val && val[1] in document) {
  				for (i = 0; i < val.length; i++) {
  					ret[fnMap[0][i]] = val[i];
  				}
  				return ret;
  			}
  		}

  		return false;
  	})();

  	var eventNameMap = {
  		change: fn.fullscreenchange,
  		error: fn.fullscreenerror
  	};

  	var screenfull = {
  		request: function (element) {
  			return new Promise(function (resolve, reject) {
  				var onFullScreenEntered = function () {
  					this.off('change', onFullScreenEntered);
  					resolve();
  				}.bind(this);

  				this.on('change', onFullScreenEntered);

  				element = element || document.documentElement;

  				var returnPromise = element[fn.requestFullscreen]();

  				if (returnPromise instanceof Promise) {
  					returnPromise.then(onFullScreenEntered).catch(reject);
  				}
  			}.bind(this));
  		},
  		exit: function () {
  			return new Promise(function (resolve, reject) {
  				if (!this.isFullscreen) {
  					resolve();
  					return;
  				}

  				var onFullScreenExit = function () {
  					this.off('change', onFullScreenExit);
  					resolve();
  				}.bind(this);

  				this.on('change', onFullScreenExit);

  				var returnPromise = document[fn.exitFullscreen]();

  				if (returnPromise instanceof Promise) {
  					returnPromise.then(onFullScreenExit).catch(reject);
  				}
  			}.bind(this));
  		},
  		toggle: function (element) {
  			return this.isFullscreen ? this.exit() : this.request(element);
  		},
  		onchange: function (callback) {
  			this.on('change', callback);
  		},
  		onerror: function (callback) {
  			this.on('error', callback);
  		},
  		on: function (event, callback) {
  			var eventName = eventNameMap[event];
  			if (eventName) {
  				document.addEventListener(eventName, callback, false);
  			}
  		},
  		off: function (event, callback) {
  			var eventName = eventNameMap[event];
  			if (eventName) {
  				document.removeEventListener(eventName, callback, false);
  			}
  		},
  		raw: fn
  	};

  	if (!fn) {
  		if (isCommonjs) {
  			module.exports = {isEnabled: false};
  		} else {
  			window.screenfull = {isEnabled: false};
  		}

  		return;
  	}

  	Object.defineProperties(screenfull, {
  		isFullscreen: {
  			get: function () {
  				return Boolean(document[fn.fullscreenElement]);
  			}
  		},
  		element: {
  			enumerable: true,
  			get: function () {
  				return document[fn.fullscreenElement];
  			}
  		},
  		isEnabled: {
  			enumerable: true,
  			get: function () {
  				// Coerce to boolean in case of old WebKit
  				return Boolean(document[fn.fullscreenEnabled]);
  			}
  		}
  	});

  	if (isCommonjs) {
  		module.exports = screenfull;
  	} else {
  		window.screenfull = screenfull;
  	}
  })();
  });
  var screenfull_1 = screenfull.isEnabled;

  function property(flv, control) {
    var player = flv.player;
    Object.defineProperty(control, 'controls', {
      get: function get() {
        return player.$player.classList.contains('flvplayer-controls-show');
      },
      set: function set(type) {
        if (type) {
          player.$player.classList.add('flvplayer-controls-show');
        } else {
          player.$player.classList.remove('flvplayer-controls-show');
        }
      }
    });
    Object.defineProperty(control, 'loading', {
      get: function get() {
        return player.$player.classList.contains('flvplayer-loading-show');
      },
      set: function set(type) {
        if (type) {
          player.$player.classList.add('flvplayer-loading-show');
        } else {
          player.$player.classList.remove('flvplayer-loading-show');
        }
      }
    });

    try {
      var screenfullChange = function screenfullChange() {
        if (control.fullscreen) {
          player.$container.classList.add('flvplayer-fullscreen');
        } else {
          player.$container.classList.remove('flvplayer-fullscreen');
        }

        control.autoSize();
      };

      screenfull.on('change', screenfullChange);
      flv.events.destroys.push(function () {
        screenfull.off('change', screenfullChange);
      });
    } catch (error) {//
    }

    Object.defineProperty(control, 'fullscreen', {
      get: function get() {
        return screenfull.isFullscreen || player.$container.classList.contains('flvplayer-fullscreen-web');
      },
      set: function set(type) {
        if (type) {
          try {
            screenfull.request(player.$container);
          } catch (error) {
            control.webFullscreen = true;
          }
        } else {
          try {
            screenfull.exit();
          } catch (error) {
            control.webFullscreen = false;
          }
        }
      }
    });
    Object.defineProperty(control, 'webFullscreen', {
      set: function set(type) {
        if (type) {
          player.$container.classList.add('flvplayer-fullscreen-web');
          var _document$body = document.body,
              bodyHeight = _document$body.clientHeight,
              bodyWidth = _document$body.clientWidth;
          var _player$$player = player.$player,
              playerHeight = _player$$player.clientHeight,
              playerWidth = _player$$player.clientWidth;
          var bodyRatio = bodyWidth / bodyHeight;
          var playerRatio = playerWidth / playerHeight;
          var needSpin = bodyRatio < playerRatio;

          if (needSpin) {
            var scale = Math.min(bodyHeight / playerWidth, bodyWidth / playerHeight);
            player.$player.style.transform = "rotate(90deg) scale(".concat(scale, ",").concat(scale, ")");
          }
        } else {
          player.$container.classList.remove('flvplayer-fullscreen-web');
          player.$player.style.transform = null;
        }
      }
    });
    Object.defineProperty(control, 'autoSize', {
      value: function value() {
        player.$container.style.padding = '0 0';
        var playerWidth = player.width;
        var playerHeight = player.height;
        var playerRatio = playerWidth / playerHeight;
        var canvasWidth = player.$canvas.width;
        var canvasHeight = player.$canvas.height;
        var canvasRatio = canvasWidth / canvasHeight;

        if (playerRatio > canvasRatio) {
          var padding = (playerWidth - playerHeight * canvasRatio) / 2;
          player.$container.style.padding = "0 ".concat(padding, "px");
        } else {
          var _padding = (playerHeight - playerWidth / canvasRatio) / 2;

          player.$container.style.padding = "".concat(_padding, "px 0");
        }
      }
    });
  }

  function controls(flv, control) {
    var poster = flv.options.poster,
        proxy = flv.events.proxy,
        player = flv.player;
    proxy(window, ['click', 'contextmenu'], function (event) {
      if (event.composedPath().indexOf(player.$container) > -1) {
        control.isFocus = true;
      } else {
        control.isFocus = false;
      }
    });
    control.autoSize();
    flv.on('resize', function () {
      control.autoSize();
    });
    flv.on('scripMeta', function () {
      control.autoSize();
    });
    proxy(window, 'orientationchange', function () {
      setTimeout(function () {
        control.autoSize();
      }, 300);
    });

    if (poster) {
      flv.once('play', function () {
        control.$poster.style.display = 'none';
      });
      flv.once('seeked', function () {
        control.$poster.style.display = 'none';
      });
    }

    flv.on('waiting', function () {
      control.loading = true;
    });
    flv.on('ended', function () {
      control.loading = false;
    });
    flv.on('timeupdate', function () {
      control.loading = false;
    });
    proxy(control.$play, 'click', function () {
      player.play();
    });
    proxy(control.$pause, 'click', function () {
      player.pause();
    });
    var loadedFn = throttle(function (timestamp) {
      var time = clamp(timestamp / player.duration, 0, 1);
      control.$loaded.style.width = "".concat(time * 100, "%");
    }, 500);
    flv.on('videoLoaded', function (timestamp) {
      if (!flv.options.live) {
        loadedFn(timestamp);
      }
    });
    var timeupdateFn = throttle(function (currentTime) {
      control.$played.style.width = "".concat(currentTime / player.duration * 100, "%");
      control.$current.innerText = secondToTime(currentTime);
    }, 500);
    flv.on('timeupdate', function (currentTime) {
      if (!flv.options.live) {
        timeupdateFn(currentTime);
      }
    });
    flv.on('seeked', function (currentTime) {
      if (!flv.options.live) {
        timeupdateFn(currentTime);
      }
    });
    flv.on('play', function () {
      control.$play.style.display = 'none';
      control.$pause.style.display = 'block';
    });
    flv.on('ended', function () {
      control.controls = true;
      control.$play.style.display = 'block';
      control.$pause.style.display = 'none';
    });
    flv.on('loop', function () {
      control.controls = false;
    });
    flv.on('pause', function () {
      control.$play.style.display = 'block';
      control.$pause.style.display = 'none';
      control.loading = false;
    });
    flv.on('scripMeta', function () {
      if (!flv.options.live) {
        control.$duration.innerText = secondToTime(player.duration);
      }
    });
    proxy(control.$fullscreen, 'click', function () {
      if (control.fullscreen) {
        control.fullscreen = false;
      } else {
        control.fullscreen = true;
      }
    });
    var autoHide = debounce(function () {
      player.$player.classList.add('flvplayer-hide-cursor');
      control.controls = false;
    }, 5000);
    proxy(player.$player, 'mousemove', function () {
      autoHide.clearTimeout();
      player.$player.classList.remove('flvplayer-hide-cursor');
      control.controls = true;

      if (player.playing) {
        autoHide();
      }
    });

    function volumeChangeFromEvent(event) {
      var _control$$volumePanel = control.$volumePanel.getBoundingClientRect(),
          panelLeft = _control$$volumePanel.left,
          panelWidth = _control$$volumePanel.width;

      var _control$$volumeHandl = control.$volumeHandle.getBoundingClientRect(),
          handleWidth = _control$$volumeHandl.width;

      var percentage = clamp(event.x - panelLeft - handleWidth / 2, 0, panelWidth - handleWidth / 2) / (panelWidth - handleWidth);
      return percentage;
    }

    function setVolumeHandle(percentage) {
      if (percentage === 0) {
        if (!flv.isMobile) {
          setStyle(control.$volumeHandle, 'left', '0');
        }

        setStyle(control.$volumeOn, 'display', 'none');
        setStyle(control.$volumeOff, 'display', 'flex');
      } else {
        if (!flv.isMobile) {
          var panelWidth = getStyle(control.$volumePanel, 'width') || 60;
          var handleWidth = getStyle(control.$volumeHandle, 'width');
          var width = (panelWidth - handleWidth) * percentage;
          setStyle(control.$volumeHandle, 'left', "".concat(width, "px"));
        }

        setStyle(control.$volumeOn, 'display', 'flex');
        setStyle(control.$volumeOff, 'display', 'none');
      }
    }

    if (flv.options.hasAudio) {
      var lastVolume = 0;
      var isVolumeDroging = false;

      if (flv.options.muted) {
        setVolumeHandle(0);
      } else {
        setVolumeHandle(flv.options.volume);
      }

      flv.on('volumechange', function () {
        setVolumeHandle(player.volume);
      });
      proxy(control.$volumeOn, 'click', function () {
        control.$volumeOn.style.display = 'none';
        control.$volumeOff.style.display = 'block';
        lastVolume = player.volume;
        player.volume = 0;
      });
      proxy(control.$volumeOff, 'click', function () {
        control.$volumeOn.style.display = 'block';
        control.$volumeOff.style.display = 'none';
        player.volume = lastVolume || 0.7;
      });

      if (!flv.isMobile) {
        proxy(control.$volumePanel, 'click', function (event) {
          player.volume = volumeChangeFromEvent(event);
        });
        proxy(control.$volumeHandle, 'mousedown', function () {
          isVolumeDroging = true;
        });
        proxy(control.$volumeHandle, 'mousemove', function (event) {
          if (isVolumeDroging) {
            player.volume = volumeChangeFromEvent(event);
          }
        });
      }

      proxy(document, 'mouseup', function () {
        if (isVolumeDroging) {
          isVolumeDroging = false;
        }
      });
    }

    function getPosFromEvent(event) {
      var $progress = control.$progress;

      var _$progress$getBoundin = $progress.getBoundingClientRect(),
          left = _$progress$getBoundin.left;

      var width = clamp(event.x - left, 0, $progress.clientWidth);
      var second = width / $progress.clientWidth * player.duration;
      var time = secondToTime(second);
      var percentage = clamp(width / $progress.clientWidth, 0, 1);
      return {
        second: second,
        time: time,
        width: width,
        percentage: percentage
      };
    }

    if (!flv.options.live && flv.options.cache) {
      proxy(control.$progress, 'click', function (event) {
        if (event.target !== control.$indicator) {
          var _getPosFromEvent = getPosFromEvent(event),
              second = _getPosFromEvent.second,
              percentage = _getPosFromEvent.percentage;

          if (second <= player.loaded) {
            control.$played.style.width = "".concat(percentage * 100, "%");
            player.currentTime = second;
          }
        }
      });
      var isIndicatorDroging = false;
      proxy(control.$indicator, 'mousedown', function () {
        isIndicatorDroging = true;
      });
      proxy(document, 'mousemove', function (event) {
        if (isIndicatorDroging) {
          var _getPosFromEvent2 = getPosFromEvent(event),
              second = _getPosFromEvent2.second,
              percentage = _getPosFromEvent2.percentage;

          if (second <= player.loaded) {
            control.$played.style.width = "".concat(percentage * 100, "%");
            player.currentTime = second;
          }
        }
      });
      proxy(document, 'mouseup', function () {
        if (isIndicatorDroging) {
          isIndicatorDroging = false;
        }
      });
    }
  }

  var Control = function Control(flv) {
    classCallCheck(this, Control);

    template(flv, this);
    observer(flv);
    property(flv, this);
    controls(flv, this);

    if (flv.options.hotkey) {
      hotkey(flv, this);
    }
  };

  window.FlvplayerControl = Control;

  return Control;

})));
//# sourceMappingURL=flvplayer-control.js.map
