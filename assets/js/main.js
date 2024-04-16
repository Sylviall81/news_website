/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body"),
    $wrapper = $("#wrapper"),
    $header = $("#header"),
    $nav = $("#nav"),
    $main = $("#main"),
    $navPanelToggle,
    $navPanel,
    $navPanelInner;

  // Breakpoints.
  breakpoints({
    default: ["1681px", null],
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  $.fn._parallax = function (intensity) {
    var $window = $(window),
      $this = $(this);

    if (this.length == 0 || intensity === 0) return $this;

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) $(this[i])._parallax(intensity);

      return $this;
    }

    if (!intensity) intensity = 0.25;

    $this.each(function () {
      var $t = $(this),
        $bg = $('<div class="bg"></div>').appendTo($t),
        on,
        off;

      on = function () {
        $bg.removeClass("fixed").css("transform", "matrix(1,0,0,1,0,0)");

        $window.on("scroll._parallax", function () {
          var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);

          $bg.css("transform", "matrix(1,0,0,1,0," + pos * intensity + ")");
        });
      };

      off = function () {
        $bg.addClass("fixed").css("transform", "none");

        $window.off("scroll._parallax");
      };

      // Disable parallax on ..
      if (
        browser.name == "ie" || // IE
        browser.name == "edge" || // Edge
        window.devicePixelRatio > 1 || // Retina/HiDPI (= poor performance)
        browser.mobile
      )
        // Mobile devices
        off();
      // Enable everywhere else.
      else {
        breakpoints.on(">large", on);
        breakpoints.on("<=large", off);
      }
    });

    $window
      .off("load._parallax resize._parallax")
      .on("load._parallax resize._parallax", function () {
        $window.trigger("scroll");
      });

    return $(this);
  };

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Scrolly.
  $(".scrolly").scrolly();

  // Background.
  $wrapper._parallax(0.925);

  // Nav Panel.

  // Toggle.
  $navPanelToggle = $(
    '<a href="#navPanel" id="navPanelToggle">Menu</a>'
  ).appendTo($wrapper);

  // Change toggle styling once we've scrolled past the header.
  $header.scrollex({
    bottom: "5vh",
    enter: function () {
      $navPanelToggle.removeClass("alt");
    },
    leave: function () {
      $navPanelToggle.addClass("alt");
    },
  });

  // Panel.
  $navPanel = $(
    '<div id="navPanel">' +
      "<nav>" +
      "</nav>" +
      '<a href="#navPanel" class="close"></a>' +
      "</div>"
  )
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "right",
      target: $body,
      visibleClass: "is-navPanel-visible",
    });

  // Get inner.
  $navPanelInner = $navPanel.children("nav");

  // Move nav content on breakpoint change.
  var $navContent = $nav.children();

  breakpoints.on(">medium", function () {
    // NavPanel -> Nav.
    $navContent.appendTo($nav);

    // Flip icon classes.
    $nav.find(".icons, .icon").removeClass("alt");
  });

  breakpoints.on("<=medium", function () {
    // Nav -> NavPanel.
    $navContent.appendTo($navPanelInner);

    // Flip icon classes.
    $navPanelInner.find(".icons, .icon").addClass("alt");
  });

  // Hack: Disable transitions on WP.
  if (browser.os == "wp" && browser.osVersion < 10)
    $navPanel.css("transition", "none");

  // Intro.
  var $intro = $("#intro");

  if ($intro.length > 0) {
    // Hack: Fix flex min-height on IE.
    if (browser.name == "ie") {
      $window
        .on("resize.ie-intro-fix", function () {
          var h = $intro.height();

          if (h > $window.height()) $intro.css("height", "auto");
          else $intro.css("height", h);
        })
        .trigger("resize.ie-intro-fix");
    }

    // Hide intro on scroll (> small).
    breakpoints.on(">small", function () {
      $main.unscrollex();

      $main.scrollex({
        mode: "bottom",
        top: "25vh",
        bottom: "-50vh",
        enter: function () {
          $intro.addClass("hidden");
        },
        leave: function () {
          $intro.removeClass("hidden");
        },
      });
    });

    // Hide intro on scroll (<= small).
    breakpoints.on("<=small", function () {
      $main.unscrollex();

      $main.scrollex({
        mode: "middle",
        top: "15vh",
        bottom: "-15vh",
        enter: function () {
          $intro.addClass("hidden");
        },
        leave: function () {
          $intro.removeClass("hidden");
        },
      });
    });
  }
})(jQuery);

async function print(datos, id) {
  let html = await datos.text();
  //  $('#' + donde).html(html);
  document.getElementById(id).innerHTML = html;
}

//fetch de componentes

function loadHTML() {
  fetch("../assets/html/header.html")
    .then(function (response) {
      print(response, "header");
    })
    .catch(function (error) {
      console.error("Error al cargar el header:", error);
    });

    fetch("../assets/html/nav.html")
    .then(function (response) {
      print(response, "nav");
    })
    .catch(function (error) {
      console.error("Error al cargar el nav:", error);
    });

  fetch("../assets/html/intro.html")
    .then(function (response) {
      print(response, "intro");
    })
    .catch(function (error) {
      console.error("Error al cargar el texto de intro:", error);
    });

    fetch("../assets/html/login_form.html")
    .then(function (response) {
      print(response, "login-form");
    })

    .catch(function (error) {
      console.error("Error al cargar el login:", error);
    });

  fetch("../assets/html/copyright.html")
    .then(function (response) {
      print(response, "copyright");
    })
    .catch(function (error) {
      console.error("Error al cargar el copyright:", error);
    });

  fetch("../assets/html/footer.html")
    .then(function (response) {
      print(response, "footer");
    })
    .catch(function (error) {
      console.error("Error al cargar el copyright:", error);
    });
}

loadHTML();



var urlBase = "https://sylvia.104cubes.com/MySQL/";
var endpoint = "api/select.php";
var urlImages = "../../images/pic02.jpg";

fetch(urlBase + endpoint)
  .then(objectLoop)
  .catch();

async function objectLoop(response) {
  let datos = await response.json();
  console.log(datos);

  document.getElementById("print-container").innerHTML = datos
    .map(printData)
    .join(""); //map te mete comas entre items y join te permite removerla
}

function printData(item) {
  let content = item.texto;

  return [
    `<article>
		<header>
			<span class="date">${item.fecha}</span>
				<h3><a href="../../generic.html?postId=${item.id}" >${item.titulo}</a></h3>
        
        <span><strong>Escrito por:</strong> ${item.autor} | <strong>Categoría: </strong>${item.categoria} </span>
			</header>
			<a href="../../generic.html?postId=${item.id}" class="image fit" ><img src="${urlImages}" alt="" /></a>
      
			<p>${content.length >= 80 ? content.substring(0, 85) + "..." : content}</p>
				<ul class="actions special">
				<li><a href="../../generic.html?postId=${item.id} " class="button">Full Story</a></li>
				</ul>
	</article>`
  ];
}


//Fecha Actual en Portada

let currentDate = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

let formattedDate = currentDate.toLocaleDateString('es-ES', options);

// Capitalizar la primera letra de cada palabra en el nombre del mes
formattedDate = formattedDate.replace(/\b(\w)/g, char => char.toUpperCase());

// Capitalizar la primera letra del nombre del día
formattedDate = formattedDate.replace(/^(.)/, char => char.toUpperCase());

document.getElementById("fecha-actual").innerHTML = formattedDate;


//Detalle de Noticia

//funcion para obtener un parametro por nombre

function getParameterByName(name, url) {
  if (!url)
      url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results)
      return null;
  if (!results[2])
      return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


if (getParameterByName('postId')){

  let text = getParameterByName('postId');

  alert("estamos en generic para mostrar el post id:"+text)

}