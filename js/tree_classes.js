class CSS{
    constructor(){
        this.name = "Temp CSS";
        this.elements = [];
    }
    set_name(name){
        this.name = name;
    }
    get_name(){
        return this.name;
    }
    add(element){
        this.elements.push(element);
    }
    get(number){
        return this.elements[number];
    }
}

class Div {
  constructor(name, width, height){//, parent) {
    this.inner = [];
    this.id = [];
    this.class = [];
    this.style = [];
    this.name = name;
    //this.parent = parent;
    this.height = height;
    this.width = width;
    this.float = null;
    if(name==='H1' || name==='H2' || name==='H3' || name==='TEXT' || name==='LABEL'){
      this.type = 'text';
      this.text = "";
    }else{
      this.type = 'container';
    }
  }
  addCSS(object, type){
      if(type === "id"){
          this.id.push(object);
      }
      else if(type === "class"){
          this.class.push(object);
      }
      else{
          this.style.push(object);
      }
  }

  toJSON() {
        return parseDiv(this);
    }
}
