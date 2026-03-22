export const COLORWAYS = {
  plotly: ['#636efa','#EF553B','#00cc96','#ab63fa','#FFA15A','#19d3f3','#FF6692','#B6E880','#FF97FF','#FECB52'],
  d3:     ['#1f77b4','#ff7f0e','#2ca02c','#d62728','#9467bd','#8c564b','#e377c2','#7f7f7f','#bcbd22','#17becf'],
  g10:    ['#3366CC','#DC3912','#FF9900','#109618','#990099','#3B3EAC','#0099C6','#DD4477','#66AA00','#B82E2E'],
  t10:    ['#4C78A8','#F58518','#E45756','#72B7B2','#54A24B','#EECA3B','#B279A2','#FF9DA6','#9D755D','#BAB0AC'],
  dark24: ['#2E91E5','#E15F99','#1CA71C','#FB0D0D','#DA16FF','#222A2A','#B68100','#750D86','#EB663B','#511CFB','#00A08B','#FB00D1','#FC0080','#B2828D','#6C7C32','#778AAE','#862A16','#A777F1','#620042','#1616A7','#DA60CA','#6C4516','#0D2A63','#AF0038'],
  light24:['#FD3216','#00FE35','#6A76FC','#FED4C4','#FE00CE','#0DF9FF','#F6F926','#FF9616','#479B55','#EEA6FB','#DC587D','#D626FF','#6E899C','#00B5F7','#B68E00','#C9FBE5','#FF0092','#22FFA7','#E3EE9E','#86CE00','#BC7196','#7E7DCD','#FC6955','#E48F72'],
  safe:   ['#88CCEE','#CC6677','#DDCC77','#117733','#332288','#AA4499','#44AA99','#999933','#882255','#661100'],
  vivid:  ['#E58606','#5D69B1','#52BCA3','#99C945','#CC61B0','#24796C','#DAA51B','#2F8AC4','#764E9F','#ED645A'],
  pastel: ['#AEC6CF','#FFD1DC','#B5EAD7','#FFDAC1','#C7CEEA','#FF9AA2','#E2F0CB','#F8B4D9','#B4F8C8','#FFFFD8'],
  antique:['#855C75','#D9AF6B','#AF6458','#736F4C','#526A83','#625377','#68855C','#9C9C5E','#A06177','#8C785D'],
  bold:   ['#7F3C8D','#11A579','#3969AC','#F2B701','#E73F74','#80BA5A','#E68310','#008695','#CF1C90','#f97b72'],
  prism:  ['#5F4690','#1D6996','#38A6A5','#0F8554','#73AF48','#EDAD08','#E17C05','#CC503E','#94346E','#6F4070'],
};

export const COLORWAY_LIST = ['#636efa','#EF553B','#00cc96','#ab63fa','#FFA15A','#19d3f3','#FF6692','#B6E880'];

export function getSampleTraces(type, mode) {
  const x = [1,2,3,4,5,6,7,8,9,10];
  const ya = [2,3,5,7,4,8,6,9,3,7];
  const yb = [1,4,2,8,5,9,3,6,4,8];
  const m = (type === 'scatter') ? (mode || 'lines+markers') : undefined;

  switch(type) {
    case 'scatter':
      return [
        { type:'scatter', mode:m, x, y:ya, name:'Series A', marker:{size:8} },
        { type:'scatter', mode:m, x, y:yb, name:'Series B', marker:{size:8} },
      ];
    case 'bar':
      return [
        { type:'bar', x:['Jan','Feb','Mar','Apr','May','Jun'], y:[20,14,23,30,17,25], name:'Product A' },
        { type:'bar', x:['Jan','Feb','Mar','Apr','May','Jun'], y:[14,22,17,20,28,12], name:'Product B' },
      ];
    case 'pie':
      return [{ type:'pie', labels:['Alpha','Beta','Gamma','Delta','Epsilon'], values:[30,20,25,15,10] }];
    case 'histogram':
      return [
        { type:'histogram', x: Array.from({length:100}, () => (Math.random()*6-3 + Math.random()*6-3)), name:'Distribution', opacity:0.75 },
        { type:'histogram', x: Array.from({length:100}, () => (Math.random()*4-1 + Math.random()*4)), name:'Shifted', opacity:0.75 },
      ];
    case 'box':
      return [
        { type:'box', y: Array.from({length:40}, () => Math.random()*10+Math.random()*5), name:'Group A', boxpoints:'outliers' },
        { type:'box', y: Array.from({length:40}, () => Math.random()*8+Math.random()*7), name:'Group B', boxpoints:'outliers' },
      ];
    case 'violin':
      return [
        { type:'violin', y: Array.from({length:50}, () => Math.random()*10), name:'Group A', box:{visible:true}, meanline:{visible:true} },
        { type:'violin', y: Array.from({length:50}, () => Math.random()*8+2), name:'Group B', box:{visible:true}, meanline:{visible:true} },
      ];
    case 'heatmap': {
      const z = Array.from({length:8}, () => Array.from({length:10}, () => Math.random()*100));
      return [{ type:'heatmap', z, colorscale:'Viridis', name:'Heatmap' }];
    }
    case 'contour': {
      const z = Array.from({length:8}, (_, i) => Array.from({length:10}, (_2, j) => Math.sin(i*0.5)*Math.cos(j*0.5)*10));
      return [{ type:'contour', z, colorscale:'RdBu', name:'Contour' }];
    }
    case 'scatter3d':
      return [{
        type:'scatter3d', mode:'markers',
        x: Array.from({length:30}, () => Math.random()*10),
        y: Array.from({length:30}, () => Math.random()*10),
        z: Array.from({length:30}, () => Math.random()*10),
        marker:{size:4}, name:'3D Points'
      }];
    case 'surface': {
      const n=12;
      const zs = Array.from({length:n}, (_,i) => Array.from({length:n}, (_2,j) => Math.sin(i/2)*Math.cos(j/2)*5+5));
      return [{ type:'surface', z:zs, colorscale:'Viridis' }];
    }
    case 'funnel':
      return [{ type:'funnel',
        y:['Website visitors','Downloads','Trials started','Paid customers'],
        x:[1000,600,250,80] }];
    case 'waterfall':
      return [{ type:'waterfall', orientation:'v',
        x:['Sales','Returns','Marketing','Admin','Net'],
        y:[60,-10,-15,-5,null], measure:['relative','relative','relative','relative','total'] }];
    case 'treemap':
      return [{ type:'treemap',
        labels:['Root','A','B','C','A1','A2','B1'],
        parents:['','Root','Root','Root','A','A','B'],
        values:[0,10,8,5,6,4,8] }];
    case 'sunburst':
      return [{ type:'sunburst',
        labels:['Root','A','B','C','A1','A2','B1'],
        parents:['','Root','Root','Root','A','A','B'],
        values:[0,10,8,5,6,4,8] }];
    case 'indicator':
      return [{ type:'indicator', mode:'gauge+number+delta',
        value:420, delta:{reference:380},
        gauge:{axis:{range:[null,500]}, bar:{color:'darkblue'}},
        title:{text:'Speed'} }];
    default:
      return [{ type:'scatter', mode:'lines+markers', x, y:ya, name:'Series A' }];
  }
}

export const TRACE_FIELDS = {
  _common: [
    { label:'Name',        path:'name',        kind:'text' },
    { label:'Visible',     path:'visible',     kind:'mixed-bool', opts:['true','false','legendonly'] },
    { label:'Opacity',     path:'opacity',     kind:'num', min:0, max:1, step:0.01 },
    { label:'Show legend', path:'showlegend',  kind:'bool' },
    { label:'Legend rank',  path:'legendrank',  kind:'num' },
    { label:'Legend group', path:'legendgroup', kind:'text' },
  ],
  scatter: [
    { label:'Mode',        path:'mode',        kind:'select', opts:['lines','markers','lines+markers','lines+markers+text','text','none'] },
    { label:'Fill',        path:'fill',        kind:'select', opts:['none','tozeroy','tozerox','tonexty','tonextx','toself','tonext'] },
    { label:'Fill color',  path:'fillcolor',   kind:'color' },
    { label:'Connect gaps',path:'connectgaps', kind:'bool' },
    { label:'Stack group', path:'stackgroup',  kind:'text' },
    { sec:'Line' },
    { label:'Color',       path:'line.color',  kind:'color' },
    { label:'Width',       path:'line.width',  kind:'num', min:0, max:20 },
    { label:'Dash',        path:'line.dash',   kind:'select', opts:['solid','dot','dash','longdash','dashdot','longdashdot'] },
    { label:'Shape',       path:'line.shape',  kind:'select', opts:['linear','spline','hv','vh','hvh','vhv'] },
    { label:'Smoothing',   path:'line.smoothing', kind:'num', min:0, max:1.3, step:0.1 },
    { sec:'Marker' },
    { label:'Color',       path:'marker.color',  kind:'color' },
    { label:'Size',        path:'marker.size',   kind:'num', min:1, max:50 },
    { label:'Symbol',      path:'marker.symbol', kind:'select', opts:['circle','square','diamond','cross','x','triangle-up','triangle-down','pentagon','hexagon','star','star-triangle-up','circle-open','square-open','diamond-open'] },
    { label:'Opacity',     path:'marker.opacity',kind:'num', min:0, max:1, step:0.01 },
    { label:'Line color',  path:'marker.line.color', kind:'color' },
    { label:'Line width',  path:'marker.line.width', kind:'num', min:0, max:8 },
    { sec:'Error Bars X' },
    { label:'Visible',     path:'error_x.visible', kind:'bool' },
    { label:'Type',        path:'error_x.type',    kind:'select', opts:['percent','constant','sqrt','data'] },
    { label:'Value',       path:'error_x.value',   kind:'num', min:0 },
    { sec:'Error Bars Y' },
    { label:'Visible',     path:'error_y.visible', kind:'bool' },
    { label:'Type',        path:'error_y.type',    kind:'select', opts:['percent','constant','sqrt','data'] },
    { label:'Value',       path:'error_y.value',   kind:'num', min:0 },
  ],
  bar: [
    { label:'Orientation', path:'orientation', kind:'select', opts:['v','h'] },
    { label:'Bar width',   path:'width',       kind:'num', min:0, max:1, step:0.01 },
    { label:'Text pos',    path:'textposition',kind:'select', opts:['inside','outside','auto','none'] },
    { label:'Text angle',  path:'textangle',   kind:'num', min:-90, max:90 },
    { label:'Inside anchor',path:'insidetextanchor',kind:'select', opts:['end','middle','start'] },
    { label:'Offset',      path:'offset',      kind:'num' },
    { sec:'Marker' },
    { label:'Color',       path:'marker.color',      kind:'color' },
    { label:'Opacity',     path:'marker.opacity',    kind:'num', min:0, max:1, step:0.01 },
    { label:'Line color',  path:'marker.line.color', kind:'color' },
    { label:'Line width',  path:'marker.line.width', kind:'num', min:0, max:10 },
    { label:'Corner radius',path:'marker.cornerradius', kind:'num', min:0 },
  ],
  pie: [
    { label:'Hole',        path:'hole',        kind:'num', min:0, max:0.99, step:0.01 },
    { label:'Direction',   path:'direction',   kind:'select', opts:['counterclockwise','clockwise'] },
    { label:'Rotation',    path:'rotation',    kind:'num', min:0, max:360 },
    { label:'Sort',        path:'sort',        kind:'bool' },
    { label:'Text info',   path:'textinfo',    kind:'select', opts:['label','text','value','percent','label+percent','label+value','value+percent','label+text+value','none'] },
    { label:'Text pos',    path:'textposition',kind:'select', opts:['inside','outside','auto','none'] },
    { label:'Pull',        path:'pull',        kind:'num', min:0, max:1, step:0.01 },
  ],
  histogram: [
    { label:'Orientation', path:'orientation', kind:'select', opts:['v','h'] },
    { label:'Hist func',   path:'histfunc',    kind:'select', opts:['count','sum','avg','min','max'] },
    { label:'Hist norm',   path:'histnorm',    kind:'select', opts:['','percent','probability','density','probability density'] },
    { label:'Nbins X',     path:'nbinsx',      kind:'num', min:0, max:500 },
    { label:'Nbins Y',     path:'nbinsy',      kind:'num', min:0, max:500 },
    { label:'Bin size',    path:'xbins.size',  kind:'num', min:0 },
    { label:'Cumulative',  path:'cumulative.enabled', kind:'bool' },
    { label:'Cum direction',path:'cumulative.direction',kind:'select',opts:['increasing','decreasing'] },
    { sec:'Marker' },
    { label:'Color',       path:'marker.color',      kind:'color' },
    { label:'Line color',  path:'marker.line.color', kind:'color' },
    { label:'Line width',  path:'marker.line.width', kind:'num', min:0, max:5 },
  ],
  box: [
    { label:'Orientation', path:'orientation', kind:'select', opts:['v','h'] },
    { label:'Box points',  path:'boxpoints',   kind:'mixed-bool', opts:['all','outliers','suspectedoutliers','false'] },
    { label:'Box mean',    path:'boxmean',     kind:'mixed-bool', opts:['false','true','sd'] },
    { label:'Jitter',      path:'jitter',      kind:'num', min:0, max:1, step:0.05 },
    { label:'Point pos',   path:'pointpos',    kind:'num', min:-2, max:2, step:0.1 },
    { label:'Notched',     path:'notched',     kind:'bool' },
    { label:'Whisker width',path:'whiskerwidth',kind:'num', min:0, max:1, step:0.05 },
    { label:'Q1/Q3 method',path:'quartilemethod',kind:'select',opts:['linear','exclusive','inclusive'] },
    { sec:'Marker' },
    { label:'Color',       path:'marker.color', kind:'color' },
    { label:'Size',        path:'marker.size',  kind:'num', min:1, max:20 },
    { sec:'Line' },
    { label:'Color',       path:'line.color',   kind:'color' },
    { label:'Width',       path:'line.width',   kind:'num', min:0, max:10 },
  ],
  violin: [
    { label:'Orientation', path:'orientation',  kind:'select', opts:['v','h'] },
    { label:'Points',      path:'points',       kind:'mixed-bool', opts:['all','outliers','suspectedoutliers','false'] },
    { label:'Side',        path:'side',         kind:'select', opts:['both','positive','negative'] },
    { label:'Span mode',   path:'spanmode',     kind:'select', opts:['soft','hard','manual'] },
    { label:'Bandwidth',   path:'bandwidth',    kind:'num', min:0, step:0.1 },
    { label:'Scale mode',  path:'scalemode',    kind:'select', opts:['width','count'] },
    { label:'Box visible', path:'box.visible',  kind:'bool' },
    { label:'Box width',   path:'box.width',    kind:'num', min:0, max:1, step:0.1 },
    { label:'Meanline',    path:'meanline.visible', kind:'bool' },
    { label:'Mean color',  path:'meanline.color',   kind:'color' },
    { sec:'Marker' },
    { label:'Color',       path:'marker.color', kind:'color' },
    { label:'Size',        path:'marker.size',  kind:'num', min:1, max:20 },
  ],
  heatmap: [
    { label:'Colorscale',  path:'colorscale',   kind:'select', opts:['Viridis','Plasma','Cividis','Inferno','Magma','RdBu','Blues','Greens','Hot','Jet','Rainbow','RdYlBu','Spectral','YlOrRd','Electric','Greys'] },
    { label:'Reverse scale',path:'reversescale',kind:'bool' },
    { label:'Show scale',  path:'showscale',    kind:'bool' },
    { label:'Z auto',      path:'zauto',        kind:'bool' },
    { label:'Z min',       path:'zmin',         kind:'num' },
    { label:'Z max',       path:'zmax',         kind:'num' },
    { label:'Z smooth',    path:'zsmooth',      kind:'mixed-bool', opts:['false','fast','best'] },
    { label:'X gap',       path:'xgap',         kind:'num', min:0, max:20 },
    { label:'Y gap',       path:'ygap',         kind:'num', min:0, max:20 },
    { label:'Transpose',   path:'transpose',    kind:'bool' },
    { label:'Connect gaps',path:'connectgaps',  kind:'bool' },
  ],
  contour: [
    { label:'Colorscale',  path:'colorscale',   kind:'select', opts:['Viridis','Plasma','Cividis','RdBu','Blues','Greens','Hot','Jet','Rainbow','RdYlBu','Spectral','YlOrRd','Electric','Greys'] },
    { label:'Reverse scale',path:'reversescale',kind:'bool' },
    { label:'Show scale',  path:'showscale',    kind:'bool' },
    { label:'Z auto',      path:'zauto',        kind:'bool' },
    { label:'Z min',       path:'zmin',         kind:'num' },
    { label:'Z max',       path:'zmax',         kind:'num' },
    { label:'n Contours',  path:'ncontours',    kind:'num', min:1, max:50 },
    { label:'Show lines',  path:'contours.showlines',kind:'bool' },
    { label:'Coloring',    path:'contours.coloring',kind:'select',opts:['fill','heatmap','lines','none'] },
    { label:'Transpose',   path:'transpose',    kind:'bool' },
  ],
  surface: [
    { label:'Colorscale',  path:'colorscale',   kind:'select', opts:['Viridis','Plasma','Cividis','RdBu','Blues','Greens','Hot','Jet','Rainbow','RdYlBu','Spectral','YlOrRd','Electric','Greys'] },
    { label:'Reverse scale',path:'reversescale',kind:'bool' },
    { label:'Show scale',  path:'showscale',    kind:'bool' },
    { label:'C auto',      path:'cauto',        kind:'bool' },
    { label:'C min',       path:'cmin',         kind:'num' },
    { label:'C max',       path:'cmax',         kind:'num' },
    { label:'Lighting ambient',path:'lighting.ambient',    kind:'num', min:0, max:1, step:0.05 },
    { label:'Lighting diffuse',path:'lighting.diffuse',    kind:'num', min:0, max:1, step:0.05 },
    { label:'Lighting roughness',path:'lighting.roughness',kind:'num', min:0, max:1, step:0.05 },
    { label:'Contours X',  path:'contours.x.show', kind:'bool' },
    { label:'Contours Y',  path:'contours.y.show', kind:'bool' },
    { label:'Contours Z',  path:'contours.z.show', kind:'bool' },
  ],
  scatter3d: [
    { label:'Mode',        path:'mode',         kind:'select', opts:['lines','markers','lines+markers','text','lines+markers+text'] },
    { sec:'Marker' },
    { label:'Color',       path:'marker.color', kind:'color' },
    { label:'Size',        path:'marker.size',  kind:'num', min:1, max:20 },
    { label:'Symbol',      path:'marker.symbol',kind:'select', opts:['circle','circle-open','square','square-open','diamond','diamond-open','cross','x'] },
    { label:'Opacity',     path:'marker.opacity',kind:'num', min:0, max:1, step:0.01 },
    { sec:'Line' },
    { label:'Color',       path:'line.color',   kind:'color' },
    { label:'Width',       path:'line.width',   kind:'num', min:0, max:20 },
  ],
  funnel: [
    { label:'Orientation', path:'orientation',  kind:'select', opts:['v','h'] },
    { label:'Text info',   path:'textinfo',     kind:'select', opts:['label','text','value','percent previous','percent initial','percent total','none'] },
    { label:'Text pos',    path:'textposition', kind:'select', opts:['inside','outside','auto','none'] },
    { sec:'Connector' },
    { label:'Fill color',  path:'connector.fillcolor', kind:'color' },
    { label:'Visible',     path:'connector.visible',   kind:'bool' },
    { sec:'Marker' },
    { label:'Color',       path:'marker.color',      kind:'color' },
    { label:'Line color',  path:'marker.line.color', kind:'color' },
    { label:'Line width',  path:'marker.line.width', kind:'num', min:0, max:10 },
  ],
  waterfall: [
    { label:'Orientation', path:'orientation',  kind:'select', opts:['v','h'] },
    { label:'Text info',   path:'textinfo',     kind:'select', opts:['label','text','initial','delta','final','none'] },
    { label:'Text pos',    path:'textposition', kind:'select', opts:['inside','outside','auto','none'] },
    { sec:'Increasing' },
    { label:'Fill color',  path:'increasing.marker.color',       kind:'color' },
    { label:'Line color',  path:'increasing.marker.line.color',  kind:'color' },
    { sec:'Decreasing' },
    { label:'Fill color',  path:'decreasing.marker.color',       kind:'color' },
    { label:'Line color',  path:'decreasing.marker.line.color',  kind:'color' },
    { sec:'Totals' },
    { label:'Fill color',  path:'totals.marker.color',           kind:'color' },
    { label:'Line color',  path:'totals.marker.line.color',      kind:'color' },
  ],
  treemap: [
    { label:'Tiling algo', path:'tiling.packing',    kind:'select', opts:['squarify','binary','dice','slice','slice-dice','dice-slice'] },
    { label:'Text info',   path:'textinfo',          kind:'select', opts:['label','text','value','current path','percent root','percent entry','percent parent','none'] },
    { label:'Text pos',    path:'textposition',      kind:'select', opts:['top left','top center','top right','middle left','middle center','middle right','bottom left','bottom center','bottom right'] },
    { label:'Branchvalues',path:'branchvalues',      kind:'select', opts:['remainder','total'] },
    { label:'Max depth',   path:'maxdepth',          kind:'num', min:-1, max:10 },
  ],
  sunburst: [
    { label:'Text info',   path:'textinfo',    kind:'select', opts:['label','text','value','current path','percent root','percent entry','percent parent','none'] },
    { label:'Branchvalues',path:'branchvalues',kind:'select', opts:['remainder','total'] },
    { label:'Max depth',   path:'maxdepth',    kind:'num', min:-1, max:10 },
    { label:'Rotation',    path:'rotation',    kind:'num', min:0, max:360 },
    { label:'Sort',        path:'sort',        kind:'bool' },
  ],
  indicator: [
    { label:'Mode',        path:'mode',        kind:'text', placeholder:'number+gauge+delta' },
    { label:'Value',       path:'value',       kind:'num' },
    { label:'Align',       path:'align',       kind:'select', opts:['left','center','right'] },
    { sec:'Number' },
    { label:'Suffix',      path:'number.suffix', kind:'text' },
    { label:'Prefix',      path:'number.prefix', kind:'text' },
    { label:'Font size',   path:'number.font.size', kind:'num', min:0 },
    { label:'Font color',  path:'number.font.color', kind:'color' },
    { sec:'Delta' },
    { label:'Reference',   path:'delta.reference', kind:'num' },
    { label:'Increasing color',path:'delta.increasing.color', kind:'color' },
    { label:'Decreasing color',path:'delta.decreasing.color', kind:'color' },
    { sec:'Gauge' },
    { label:'Shape',       path:'gauge.shape', kind:'select', opts:['angular','bullet'] },
    { label:'Bar color',   path:'gauge.bar.color', kind:'color' },
    { label:'Bar thickness',path:'gauge.bar.thickness', kind:'num', min:0, max:1, step:0.05 },
    { label:'BG color',    path:'gauge.bgcolor', kind:'color' },
  ],
};
