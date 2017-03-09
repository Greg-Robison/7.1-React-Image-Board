var React = require('react');
var Backbone = require('backbone');

var ImageCollection = require('../models/image').ImageCollection;
var Image = require('../models/image').Image;

var ImageBoardContainer = React.createClass({
  getInitialState: function(){
    var imageCollection = new ImageCollection();
    return{
      imageCollection: imageCollection,
      showForm: false,
      imageToEdit: new Image()
    }
  },
  componentWillMount: function(){
    var newImageCollection = this.state.imageCollection;
    newImageCollection.add([
      {id: 1, url: '././images/window.jpg', description: 'Beautiful'},
      {id: 2, url: '././images/Prague.jpg', description: 'Outstanding'}
    ]);

    this.setState({imageCollection: newImageCollection});

  },
  handleToggleForm: function(event){
    event.preventDefault();
    this.setState({showForm: !this.state.showForm});

  },
  addImage: function(image){
    var images = this.state.imageCollection;
    images.add(image);
    this.setState({imageCollection: images, showForm: false});

  },
  editImage: function(model, imageData){
    
    model.set(imageData);
    this.setState({imageCollection: this.state.imageCollection});
  },
  showEditForm: function(imageToEdit){
    this.setState({showForm: true, imageToEdit: imageToEdit});

  },
  render: function(){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="well">
        <ul className="nav nav-pills">
          <li role="presentaition" className="active">
            <a className="plus" onClick={this.handleToggleForm} href="#">+</a>
          </li>
        </ul>
        </div>
        </div>

        {this.state.showForm ? <ImageForm
                                imageToEdit={this.state.imageToEdit}
                                addImage={this.addImage}
                                editImage={this.editImage}
                              /> : null}

        <ImageList
          imageCollection={this.state.imageCollection}
          showEditForm={this.showEditForm}
        />
      </div>
    )
  }
});
var ImageForm = React.createClass({
  propTypes: {
    addImage: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return this.props.imageToEdit.toJSON();
  },
  componentWillReceiveProps: function(nextProps){
    this.setState(nextProps.imageToEdit.toJSON());
  },
  handleUrlChange: function(event){
    this.setState({'url': event.target.value});
  },
  handleDescriptionChange: function(event){
    this.setState({'description': event.target.value});
  },
  handleSubmit: function(event){
    event.preventDefault();
    if(this.props.imageToEdit.isNew()){
      this.props.addImage(this.state);
    }else{
      this.props.editImage(this.props.imageToEdit, this.state);
    }

    this.setState({url: '', description: ''});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="well">
        <div className="form-group">
          <label htmlFor="url">Image URL</label>
          <input onChange={this.handleUrlChange} value={this.state.url} type="text" className="form-control" id="url" placeholder="Url" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input onChange={this.handleDescriptionChange} value={this.state.description} type="text" className="form-control" id="description" placeholder="Description" />
        </div>
        <button type="submit" className="add btn btn-success">Add Image</button>
      </form>
    )
  }
});

var ImageList = React.createClass({
  propTypes: {
    imageCollection: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
    showEditForm: React.PropTypes.func.isRequired
  },
  render: function(){
    var self = this;
    var imageBoardList = this.props.imageCollection.map(function(image){
      return (
        <div key={image.cid} className="thumbnail">
          <img src={image.get('url')} alt={image.get('description')} />
          <div className="caption">
            {/*<h3>Thumbnail label</h3>*/}
            <p>{image.get('description')}</p>
            <p>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  self.props.showEditForm(image);
                }}
                href="#"
                className="edit btn btn-success"
                role="button"
              >
                Edit
              </a>
              <a href="#" className="delete btn btn-danger" role="button">Delete</a>
            </p>
          </div>
        </div>
      )
    });

    return (
      <div className="row">
        <div className="col-sm-6 col-md-4">

          {imageBoardList}

        </div>
      </div>
    )
  }
});

module.exports = {
  ImageBoardContainer
};
