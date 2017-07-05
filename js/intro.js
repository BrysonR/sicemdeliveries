  // wait until all the resources are loaded
  window.addEventListener("load", bindEventsToSVG, false);
  
  // Checking if intro has been shown before
	
  if (localStorage.getItem('firstTimeVisitor') == null)
  {
	$('.introduction').show();
  }

  var _button;

  // Fetches the document for the given embedding_element
  function getSubDocument(embeddedElement)
  {
    if (embeddedElement.contentDocument)
    {
      return embeddedElement.contentDocument;
    }
    else
    {
      var subDocument = null;
      try
      {
        subDocument = embeddedElement.getSVGDocument();
      }
      catch(e)
      {
        //console.log('Problem finding svg document.');
      }

      return subDocument;
    }
  }

  function bindEventsToSVG()
  {
    var svgElement = document.querySelector(".svgEmbed");
    var subDocument = getSubDocument(svgElement);
    if (subDocument)
    {
      _button = $(subDocument.getElementById("Button"));
      _button.click(dismissIntro);
      _button.hover(buttonHover);
    }
    else
    {
    
    }
  }

  function buttonHover(event)
  {
    _button.css('cursor', 'pointer');
  }

  function showIntro()
  {
    bindEventsToSVG();
  }

  function dismissIntro()
  {
    $('.introduction').hide();
    localStorage.setItem('firstTimeVisitor', 'false');
  }