function emulateTouchEvents() {
		//if(emulatorReady)
			//frm.contentWindow.AppMobi.setReady();
			
		var ee=document.querySelectorAll("*");
		for(var x=0;x<ee.length;x++)
		{
		    ee[x].mouseMoving=false;
			ee[x].onmousedown=function(e)
			{
			  
				try
				{
				    this.mouseMoving=true;
				//fire off a touchstart event
				var touchevt=redirectMouseToTouch("touchstart", e);
				if(frm.contentWindow.document.ontouchstart)
					frm.contentWindow.document.ontouchstart(touchevt);
				}catch(e){ }
			}
			
			ee[x].onmouseup=function(e)
			{
				try
				{
				  this.mouseMoving=false;
                        		//fire off a touchstart event
					var touchevt=redirectMouseToTouch("touchend", e);
					if(frm.contentWindow.document.ontouchend)
						frm.contentWindow.document.ontouchend(touchevt);
				}
				catch(e){ }
			}
			
			ee[x].onmousemove=function(e)
			{
			    try
			    {
				 if(!this.mouseMoving)
				    return;
				//fire off a touchstart event
				var touchevt=redirectMouseToTouch("touchmove", e);
				if(frm.contentWindow.document.ontouchmove)
					frm.contentWindow.document.ontouchmove(touchevt);
			    }
			    catch(e){ }
			}
		}
}

function redirectMouseToTouch(type, originalEvent) {

	// stop propagation, and remove default behavior for everything but INPUT,
	// TEXTAREA & SELECT fields
	originalEvent.stopPropagation();
	if (originalEvent.target.tagName.toUpperCase().indexOf("SELECT") == -1
			&& originalEvent.target.tagName.toUpperCase().indexOf("TEXTAREA") == -1
			&& originalEvent.target.tagName.toUpperCase().indexOf("INPUT") == -1) {
		originalEvent.preventDefault();
	}

	var touchevt = document.createEvent("Event");
	touchevt.initEvent(type, true, true);
	touchevt.touches = new Array();
	touchevt.touches[0] = new Object();
	touchevt.touches[0].pageX = originalEvent.clientX;
	touchevt.touches[0].pageY = originalEvent.clientY;
	touchevt.touches[0].target = originalEvent.target;
	touchevt.changedTouches = touchevt.touches;
	touchevt.targetTouches = touchevt.touches;
	touchevt.touches[0].clientX = touchevt.touches[0].pageX; 
	touchevt.touches[0].clientY = touchevt.touches[0].pageY; 
	touchevt.target = originalEvent.target;
	originalEvent.target.dispatchEvent(touchevt);
	return touchevt;

}

window.addEventListener("load",emulateTouchEvents,false);