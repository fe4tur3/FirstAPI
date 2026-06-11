const server = "http://PORT/PFAD/v2";

/*function sanitize(result) {                        // "bereinigen"-Funktion als Platzhalter
    result = result.replace(/&/g, "&amp;");          // & zuerst, damit die "Alternativen" nicht wieder Code enthalten
    result = result.replace(/</g, "&lt;");           // immer exakt diese Zeichenketten nutzen, damit html sie wieder im Orig datstellt
    result = result.replace(/>/g, "&gt;");
    result = result.replace(/"/g, "&quot;");
    result = result.replace(/'/g, "&#039;");
    return result;                                 // gibt den bereinigten result zurück
} */

function sanitize(result) {                           //mit der Variable result tu folgendes
        let div =document.createElement('div');     //erstelle ein Element namens div
        div.textContent = result;                      // der resultinhalt der div-Variable darf nur als result (also string) dargestellt werden
        return div.innerHTML;                       // Wiedergabe des div-INhaltes in Form von HTML-Ausgabe (also ohne Sonderzeichen als Code zu behandeln)
        }


async function getApi() {                                 // async await = auf GET warten
    try {
        let serverResponse= await fetch (server + "/hello");   // let = veränderbare Var, daher kein const
        let result = await serverResponse.text();                 // serverResponse in einen result umwandeln

        let parsed = JSON.parse(result);

        document.getElementById("ausgabe1")
                .value = parsed.Value;                          // fügt result aus Server + /hello ein


        document.getElementById("eingabe")              // aktiviert die Elemente für POST
           .disabled = false;

        document.getElementById("btnPruefen")
            .disabled = false;

        document.getElementById("ausgabe2")
            .disabled = false;

        } catch(err) {
                console.log(err);
        }

    }

    async function postApi(){
        try{
            let myresult = document.getElementById("eingabe").value;

            if (myresult === "") {                              // wenn Feld leer; === Wert und Typ vergleichen
                document.getElementById("ausgabe2").value = "Bitte erst eine Erklärung eingaben";
                return;
            }
            if (myresult.length > 600) {                       // bereits in html, aber kann manipuliert werden, daher hier nochmal
                document.getElementById("ausgabe2").value = "Zu viel result, bitte maximal 600 Zeichen";
                return;
            }

            myresult = sanitize(myresult);

            let Inhalt = JSON.stringify({Value: myresult});       // Umwandlung von JS-Code in JSON-result (also in "" als string) darstellen
                                                                // Value = Schlüssel den der Server erwartet, myresult = unser eingegebener result

            /* POST-Request */
            let serverResponse = await fetch(server + "/hello", {
            method: "POST",                                    // definiert die http-Methode POST
            headers: {"Content-Type": "application/json"},      // Aufkleber auf dem Umschlag: Inhalt des Requests ist JSON
            body: Inhalt                                        //Brief im Umschlag; Inhalt des Requests an Server
            });

            let result = await serverResponse.text();                     // Speichert den INhalt aus serverResponse in result
            let parsed = JSON.parse(result);
            document.getElementById("ausgabe2").value = "Du sagst also: " + parsed.Value;



        }catch(err) {
            console.log(err);
        }
    }


document.getElementById("btnThema")
        .addEventListener("click", getApi);

document.getElementById("btnPruefen")
        .addEventListener("click", postApi)




/* const server = "http://localhost:PORT/PFAD/v2";

document.getElementById("btnThema")                     //document = ges. HTML-Seite
    .addEventListener("click", function() {

        fetch(server +"/hello")                         //fetch = hole etwas vom Server; hier GET automatisch

        .then(function(response) {

            return response.result()
        })

        .then(function(response) {

            document.getElementById("ausgabe1")
                    .value = response;

            document.getElementById("eingabe")
                .disabled = false;

            document.getElementById("btnPruefen")
                 .disabled = false;

            document.getElementById("ausgabe2")
                 .disabled = false;
        })
        .catch(function() {                             // Fehler abfangen und statt .then hier weiter
            document.getElementById("ausgabe1")
                .value = "Server nicht erreichbar";
        });                                             // ; Ende fetch

});                                                     // } Ende click-Fkt, ); Ende addEventListener
*/