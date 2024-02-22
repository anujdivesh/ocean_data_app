import React, {useEffect, useRef, useState} from "react";
import L from 'leaflet';

//import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from "axios";
import * as ReactBootStrap from 'react-bootstrap';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';

const Home = () => {

  const mapContainer = useRef(null);
  const baseLayer = useRef();
  const _isMounted = useRef(true);

  const [players, setPlayers] =useState([]);
  const [loading, setLoading] =useState(true);
  const [obsSource, setobsSource] =useState([]);

  const getPlayerData = async () => {
      try{
          setLoading(false)
          setobsSource([])
        //  const data = await axios.get("http://192.168.70.99/test.json");
         // console.log(data)
          const data2 = await axios.post("https://opmdata.gem.spc.int/api/metadata");
          let counter = 1;
          console.log(data2)
          for (var i=0; i<data2.data.length; i++){
              let temp = [];
              var country = data2.data[i].countries;
              var title = data2.data[i].title;
              var datatype = data2.data[i].data_type.datatype_code;
              var project = data2.data[i].project.project_code;
              var is_restricted = data2.data[i].is_restricted;
              var email = data2.data[i].contact.email;
              var version = data2.data[i].version;
              //var temp = [];
              temp.push({
                  "id":counter,
                  "idx":data2.data[i].id,
                  "title":title,
                  "datatype":datatype,
                  "country":country.toString(),
                  "project":project,
                  "is_restricted":is_restricted,
                  "email":email,
                  "version":version
              })
              console.log(temp)
              counter = counter + 1;
              setobsSource(prevData =>[...prevData, ...temp]);
          }

          setPlayers(data2.data)
          setLoading(true)
      }
      catch (e){
          console.log(e);
      }
  }

 
  const columns = [
      {dataField: "id", text:"ID",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "title", text:"Title",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "datatype", text:"Data Type",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "country", text:"Country",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "project", text:"Project",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "is_restricted", text:"Restricted",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "email", text:"Contact",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "version", text:"Version",style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}},
      {dataField: "edit", text:"View",formatter: rankFormatter,style:{fontSize:'13px', padding:'1px'},headerStyle: { backgroundColor: '#215E95', color: 'white'}}
  ]

  function rankFormatter(cell, row, rowIndex, formatExtraData) { 
      console.log(cell)
      return ( 
            < div 
                style={{ textAlign: "center",
                   cursor: "pointer",
                  lineHeight: "normal" }}>
                      
              <button type="submit" className="btn btn-success btn-sm" onClick={() => {
        console.log(row)
      }}>View</button>
       </div> 
  ); } 

  const columns2 = [
      {dataField: "0", text:"playername",style:{fontSize:'15px', padding:'1px'}},
      {dataField: "1", text:"country",style:{fontSize:'15px', padding:'1px'}},
      {dataField: "2", text:"countrycode",style:{fontSize:'15px', padding:'1px'}},
      {dataField: "edit", text:"View",formatter: rankFormatter,style:{fontSize:'15px', padding:'1px'}}
  ]

const options = {
  custom: true,
  totalSize: obsSource.length
};

const rowStyle = { backgroundColor: '#c8e6c9', height: '3px', padding: '3px 0' };


  function initMap(){
      baseLayer.current = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: '&copy; Pacific Community (OSM)',
          detectRetina: true
      });
      //console.log('Home Rendered!!');
      mapContainer.current = L.map('map', {
          zoom: 3,
          center: [0.878032, 185.843298]
        });
        baseLayer.current.addTo(mapContainer.current); 

        var m_drawn_features = new L.FeatureGroup();
   mapContainer.current.addLayer(m_drawn_features);

   let draw_control = new L.Control.Draw({
    position: 'topleft',
    draw: {
        polyline: false,
        polygon: false,
        circle: false,
        rectangle: true,
        circlemarker: false,
        marker: false,
    },
    edit: {
      featureGroup: m_drawn_features, //REQUIRED!!
      remove: true
  }
});

mapContainer.current.addControl(draw_control);

mapContainer.current.on(L.Draw.Event.CREATED, function(e) {
  // Remove all layers (only show one location at a time)
  m_drawn_features.clearLayers();

  // Add layer with the new features
  let new_features_layer = e.layer;
  m_drawn_features.addLayer(new_features_layer);
 // setExtent(new_features_layer)
  console.log(new_features_layer)
//  console.log('----------');
//   console.log('----------');
//  update_plot(new_features_layer);
});
  }

  useEffect(() => {  

      if (_isMounted.current){
        initMap();
    //    getPlayerData();
   
   
        
      }  
      return () => { _isMounted.current = false }; 
      },[]);
    return (
        <div className="container-fluid">
            <main id="bodyWrapper">
          <div id="mapWrapper">

 <div className="row">
 <div className="col-sm-6" style={{backgroundColor:'#f7f7f7', height:'45vh'}} id="map3">
 <div className="row" style={{marginTop:'10px'}}>
    <div className="col-sm-6">
    <div className="form-group" style={{textAlign:'left'}}>
    <label htmlFor="exampleInputEmail2" >Start date</label>
    <select className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"style={{fontSize:'13px', paddingLeft:1}}>
    <option value="Tuvalu">-- Select --</option>
</select>
  </div>
      </div>
      <div className="col-sm-6">
      <div className="form-group" style={{textAlign:'left'}}>
    <label htmlFor="exampleInputEmail3" >End Date</label>
    <select className="form-select form-select-sm"  id="exampleInputEmail3" aria-label=".form-select-sm example"style={{fontSize:'13px', paddingLeft:1}}>
    <option value="Tuvalu">-- Select --</option>
</select>
  </div>

  </div>
      </div>
      <div className="row" style={{marginTop:'10px'}}>
    <div className="col-sm-6">
    <div className="form-group" style={{textAlign:'left'}}>
    <label htmlFor="exampleInputEmail2" >Start date</label>
    <select className="form-select form-select-sm"  id="exampleInputEmail2" aria-label=".form-select-sm example"style={{fontSize:'13px', paddingLeft:1}}>
    <option value="Tuvalu">-- Select --</option>
</select>
  </div>
      </div>
      <div className="col-sm-6">
      <div className="form-group" style={{textAlign:'left'}}>
    <label htmlFor="exampleInputEmail3" >End Date</label>
    <select className="form-select form-select-sm"  id="exampleInputEmail3" aria-label=".form-select-sm example"style={{fontSize:'13px', paddingLeft:1}}>
    <option value="Tuvalu">-- Select --</option>
</select>
  </div>

  </div>
      </div>
      <button type="submit" className="btn btn-primary" onClick={getPlayerData} style={{position:'absolute', right:'51%', top:'46%', left:'44%'}}>Search</button>
 </div>
 <div className="col-sm-6" id="map" ref={mapContainer.current} />
 </div>

 <div className="row" style={{height:"50vh"}}>
    <div className="col-sm-12"  style={{padding:'2%'}}>
        {loading ? (
                <PaginationProvider
                pagination={ paginationFactory(options) }
                >
                {
                    ({
                    paginationProps,
                    paginationTableProps
                    }) => (
                    <div>
                        <PaginationTotalStandalone 
                        { ...paginationProps }
                        />
                        <PaginationListStandalone
                        { ...paginationProps }
                        />
                        <BootstrapTable
                        keyField="id"
                        data={ obsSource }
                        columns={ columns }
                        hover
                        { ...paginationTableProps }
                        />
                    </div>
                    )
                }
                </PaginationProvider>
        ):(
            <ReactBootStrap.Spinner animation="border" variant="primary"/>
        )}

        </div>
        </div>
          </div>
      </main>
      </div>
      
    );  
}

export default Home;