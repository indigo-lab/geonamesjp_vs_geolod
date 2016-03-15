"use strinct";

var request = require("request");
var N3 = require("n3");

var geolod = new Promise(function(resolve, reject) {
  var query = [
    "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>",
    "PREFIX geonlp: <http://geonlp.org/ontology/1.0#>",
    "SELECT DISTINCT ?s ?o WHERE { ?s rdfs:seeAlso ?o ; geonlp:code ?code }"
  ];
  request.get({
    url: 'http://geolod.ex.nii.ac.jp/sparql?output=json&query=' + encodeURIComponent(query.join(" ")),
    json: true
  }, function(error, response, json) {
    var map = {};
    json.results.bindings.forEach(function(a) {
      var key = a.o.value;
      var val = a.s.value;
      map[key] = val;
    });
    resolve(map);
  });
});

var dbpedia = new Promise(function(resolve, reject) {
  request.get({
    url: 'http://raw.githubusercontent.com/indigo-lab/geonamesjp_vs_dbpedia/master/2015-07-17.ttl'
  }, function(error, response, txt) {
    var map = {};
    N3.Parser().parse(txt, function(error, triple, prefixes) {
      if (triple && triple.predicate == "http://www.w3.org/2002/07/owl#sameAs") {
        var key = triple.object;
        var val = triple.subject;
        map[key] = val;
      }
      resolve(map);
    });
  });
});


Promise.all([geolod, dbpedia]).then(function(a) {
  var dbpedia2geolod = a[0];
  var dbpedia2gnjp = a[1];

  for (var dbpedia in dbpedia2geolod) {
    var gnjp = dbpedia2gnjp[dbpedia];
    var geolod = dbpedia2geolod[dbpedia];
    if (gnjp)
      console.log("<" + gnjp + "> <http://www.w3.org/2002/07/owl#sameAs> <" + geolod + "> .");
  }

  for (var dbpedia in dbpedia2gnjp) {
    var gnjp = dbpedia2gnjp[dbpedia];
    var geolod = dbpedia2geolod[dbpedia];
    if (!geolod)
      console.error("<" + gnjp + "> <http://www.w3.org/2002/07/owl#sameAs> <" + dbpedia + "> .");
  }


});
