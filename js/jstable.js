
      var _startX = 0;      
      var _startY = 0;
      var _offsetX = 0;     
      var _offsetY = 0;
      var _dragElement;     
      var _oldZIndex = 0;     
      function InitDragDrop()
      {
        document.onmousedown = OnMouseDown;
        document.onmouseup = OnMouseUp;
      }

      function OnMouseDown(e)
      {
        var target = e.target
        target.className == 'orange drag' ? 'draggable element clicked': 'NON-draggable element clicked';

        if ((e.button == 0) && target.className == 'orange drag')
        {
          _startX = e.clientX;
          _startY = e.clientY;
          
          _offsetX = ExtractNumber(target.style.left);
          _offsetY = ExtractNumber(target.style.top);
          
          _oldZIndex = target.style.zIndex;
          target.style.zIndex = 10000;
          
          _dragElement = target;

          document.onmousemove = OnMouseMove;
          
          document.body.focus();
          
          return false;
        }
      }

      function ExtractNumber(value)
      {
        var n = parseInt(value);
        
        return n == null || isNaN(n) ? 0 : n;
      }

      function OnMouseMove(e)
      {

        _dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
        _dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';
        
      }

      function OnMouseUp(e)
      {
        if (_dragElement != null)
        {
          _dragElement.style.zIndex = _oldZIndex;

          document.onmousemove = null;
          document.onselectstart = null;
          _dragElement.ondragstart = null;
          _dragElement = null;
          
        }
      }

    var Orange={
      my_div: null,
      newDiv: null,
      div_text: null,
      newContent: null,
      greenContent:null,
      greenDiv: null,
      addElement: function(e)
      {
        e.preventDefault();
        newDiv = document.createElement("div");
        newDiv.className = "orange drag";
        greenDiv = document.createElement("div");
        greenDiv.className = "rotate-handler";
        div_text = document.getElementById("name").value;
        newContent = document.createTextNode(div_text);
        greenContent = document.createTextNode("повернуть→");
        newDiv.appendChild(greenDiv);
        newDiv.appendChild(newContent); 
        greenDiv.appendChild(greenContent);

        document.getElementById("kitchen_table").appendChild(newDiv);
        newDiv.onmousedown = OnMouseDown;
        newDiv.onmouseup = OnMouseUp;
        greenDiv.onmousedown= Orange.rotate;
      },

      rotate: function(e){
        var parentNode=this.parentNode.style.MozTransform.slice(7,-4);
        var rt=0; 
        if (parentNode != ""){
          rt = parseInt(parentNode);
        }
        rt = parseInt(rt);
        rt += 45;
        
        this.parentNode.style.MozTransform = "rotate("+rt+"deg)";
      }

    }
   function load() { 
     var el = document.getElementById("add_div"); 
     el.addEventListener("click", Orange.addElement, false);
 
   } 

   document.addEventListener("DOMContentLoaded", load, false);
