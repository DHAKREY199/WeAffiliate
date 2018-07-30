      import React from "react";
      import {Button} from 'react-bootstrap'
      import InlineEdit from 'react-edit-inline'
      import {Link } from 'react-router-dom'
      import Alert from 'react-s-alert';
     import axios from 'axios'

      axios.defaults.withCredentials=true
      var widgetid=(localStorage.getItem('id'))
      var data1
    class App extends React.Component {
          constructor(props)

          {
            super(props)

            this.state = {
              values:[],
              checkedBoxes:[]}
              this.handleSubmit.bind(this)
          }
          componentDidMount(){
            var self=this
            axios("http://localhost:5000/api/client/changeWidgetSetting/category/getCategories", {
              method: "get",
              withCredentials:true,

              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                    },

                    params: {
                      widgetID: widgetid
                    },
                  }
                  )
                  .then(function(response)
                  {
                    data1=response.data.result[0].categorySetting
                    self.setState({values:data1})


                  })
                  .catch(function(e)
                  {
                    console.log(e)
                  })
             }


          handleChange(i, data) {

            const check=this.state.checkedBoxes
            var index
          for(var j=0;j<check.length;j++)
            if(check[j]===this.state.values[i].name)
                {
                  index=j

                  break;
                }
            let h=data
            let values = [...this.state.values];
            let values1=this.state.values

            values[i]=h
            values1[i].name=values[i].object
            check[index]=values[i].object
            this.setState({...data})
            this.setState({...values})
            this.setState({values:values1})

          }

          addClick(){

          this.setState({
            values: this.state.values.concat([{name:'Enter Category Name'  ,display:false,isDefault:false}])

          });
          }

          removeClick(i){
            let values = [...this.state.values];
            if (values.length===1)

            alert('Keep At least One category')
            else{
            values.splice(i,1);
            }
            this.setState({ values });
          }

      handleCheckbox = (e,s) => {
        const checkedBoxes = [...this.state.checkedBoxes];
         let values1=this.state.values
        if(e.target.checked) {
          checkedBoxes.push(this.state.values[s].name)
          values1[s].display=true

        } else {
          values1[s].display=false
          if(checkedBoxes.length===1)
          {
          alert("Atleast one Category should be selected")}
          else{
          var index
          for(var i=0;i<checkedBoxes.length;i++)
            if(checkedBoxes[i]===this.state.values[s].name)
                {
                  index=i
                  break;
                }
          checkedBoxes.splice(index,1);}

        }
        this.setState({values:values1})
        this.setState({checkedBoxes});
      }
      handleSubmit()

      {

        var data=this.state.values
        let displayflag=0;
        let defaultflag=0;
        for(var i=0;i<data.length;i++)
        {
          if(data[i].display===true)
          displayflag=1
        }
        
        if(displayflag===1)
        {
          for(i=0;i<data.length;i++)
          {
            if(data[i].display===false&&data[i].isDefault===true)
            {
              defaultflag=1
            }
          }
        }
        if(displayflag===0)
        {
          Alert.info('Keep atleast one category to display', {
            position: 'top-right',
            effect: 'slide',
            beep: true,
            timeout: 3000,
            
        });
          
        }
        if(defaultflag===1)
        {
          Alert.info('Non-displaying category cannot be default', {
            position: 'top-right',
            effect: 'slide',
            beep: true,
            timeout: 3000,
            
        });
        }
        if(displayflag===1&&defaultflag===0)
        {
          Alert.success('Your Category Setting has been saved successfully', {
            position: 'top-right',
            effect: 'slide',
            beep: true,
            timeout: 3000,
            
        });
        const payload={
          widgetID : widgetid,
          categorySetting:data


        }
        axios.post("http://localhost:5000/api/client/changeWidgetSetting/category/updateCategories", payload )
            .then(function(response)
            {
              console.log(response);
            })
            .catch(function(e)
            {
              console.log(e)
            })
          }

      }
      handleRadio(e,i)
      {
        let values1=this.state.values
      if(this.state.values.length===1)

       values1[0]=true
      for(var j=0;j<this.state.values.length;j++)
      {
      values1[j].isDefault=false
      }

      values1[i].isDefault=true
      this.setState({values:values1})
      }

          createUI(){
            let values=this.state.values
            return values.map((el, i) =>
              <div key ={i} className='item col-md-12 well'>
                  <div className='row'>
                  <div className="col-sm-2">
                              <input type="checkbox"
                              size='small' value='1'
                              defaultChecked={this.state.values[i].display}
                               checked={this.state.checkedBoxes.find((ch) =>ch===i)}
                              onChange={(e) =>this.handleCheckbox(e,i)} />
                            </div>
                          <div className="col-sm-6">
                         <strong> <InlineEdit
                    activeClassName="editing"
                    text={this.state.values[i].name}
                    paramName="object"
                    change={this.handleChange.bind(this,i)}

                    ></InlineEdit></strong>  <i className="fa fa-pencil fa-s" aria-hidden="true"></i>
                            </div>

                            <div className="col-sm-2">

                  
                    <i onClick={this.removeClick.bind(this,i)} style={{ cursor: 'pointer' }}className="fa fa-trash"/>
                
                  </div>
                  <div className="col-sm-2">
                  <input type="radio" name='isDefault'
                   defaultChecked={(this.state.values[i].isDefault) && (this.state.values[i].display)}
                  checked={this.state.checkedBoxes.find((ch) =>ch===i)}
                  onChange={(e) =>this.handleRadio(e,i)}></input></div>
                  </div>
                </div>
            )
          }


          render() {
            return (

                <div>
                  <div className='row'>
                  <ul>
                  <div className="col-sm-2"><b>Check to Display</b></div>
                  <div className="col-sm-6"><b>Category Name</b></div>

                      <div className="col-sm-2"><b>Delete</b></div>
                      <div className="col-sm-2"><b>Make Default</b></div>
                      </ul>
                      </div>

      <div className='content'>
              <ul>

                  {this.createUI()}
                  
                  </ul>
                  </div>
                <div>
                <Button bsStyle='info' className='pull-right'onClick={this.addClick.bind(this)}><i
                  className="glyphicon glyphicon-plus-sign" />Add Category</Button>

                </div>
                <br/>
                <div className='row'>
                <div className="col-md-6 col-md-offset-3">
                <br/>
                <br/>
                <br/>
                <br className='inline'/>
                  <Button bsStyle='success' onClick={this.handleSubmit.bind(this)}>
                  <i
                  className="glyphicon glyphicon-download-alt" />
                    Save Categories</Button>
                  <Link to='/components/FieldSetting'><Button bsStyle='primary'>Next</Button></Link>
                  </div>
                  </div>
                  <div className="col-lg-12">



                        </div>


              </div>

            );
          }

        }
        export default (App);
