/*
 * AppMobi.toolkit.appMobiPasswordbox
 * @copyright 2011 - AppMobi
 * @author IDM
 */
if(!window.AppMobi)
	AppMobi={};
if (!AppMobi.toolkit)
	AppMobi.toolkit = {};
AppMobi.toolkit.appMobiPassword = function() {
	this.oldPasswords = [];
};

AppMobi.toolkit.appMobiPassword.prototype = {
	oldPasswords : [],
	getOldPasswords : function(elID) {
		var container = elID && document.getElementById(elID) ? document
				.getElementById(elID) : document;
		if (!container) {
			alert("Could not find container element for appMobiPassword "
					+ elID);
			return;
		}
		var sels = container.getElementsByTagName("input");

		var that = this;
		for ( var i = 0; i < sels.length; i++) {
			if (sels[i].type != "password")
				continue;

			this.oldPasswords.push(document.getElementById(sels[i]));
			var fakeInput = document.createElement("input");
			var selWidth = parseInt(sels[i].style.width) > 0 ? parseInt(sels[i].style.width)
					: 100;
			var selHeight = parseInt(sels[i].style.height) > 0 ? parseInt(sels[i].style.height)
					: 20;
			fakeInput.type = "text";
			fakeInput.style.width = selWidth + "px";
			fakeInput.style.height = selHeight + "px";
			fakeInput.style.position = "absolute";
			fakeInput.style.left = "0px";
			fakeInput.style.top = "0px";
			fakeInput.style.zIndex = "1";
			fakeInput.value = sels[i].value;
			fakeInput.style.backgroundColor = "white";
			fakeInput.className = "appMobiSelect_fakeInput";
			fakeInput.id = sels[i].id + "_appMobiPassword";
			fakeInput.placeHolder = sels[i].placeHolder;
			var realPW = sels[i];
			fakeInput.onkeyup = function() {
				if (realPW.value.length != this.value.length) {
					var theText = this.value.substring(this.selectionStart - 1,
							this.selectionStart);
					var oldCaret = this.selectionStart;
					that.updatePassword(realPW, theText, this.selectionStart,
							this.value.length);
					if (realPW.value.length > 0) {
						var oldTxt = this.value;
						this.value = "";
						this.value = oldTxt.replace(theText, "*");
						if (oldCaret != this.value.length)
							this.setSelectionRange(oldCaret, oldCaret);
					} else
						this.value = "";
				}
			};
			sels[i].parentNode.appendChild(fakeInput);
			sels[i].style.display = "none";
			sels[i].parentNode.appendChild(fakeInput);
		}
	},

	updatePassword : function(elem, val, caretPos, totalLength) {
		if (totalLength == 0) {
			elem.value = "";
		}
		if (totalLength > elem.value.length && val.length > 0) {
			var str = elem.value;
			elem.value = str.substring(0, caretPos - 1) + val
					+ str.substring(caretPos - 1, str.length);
		} else {
			var str = elem.value;
			elem.value = str.substring(0, caretPos)
					+ str.substring(caretPos + 1, str.length);
		}
	}
};
