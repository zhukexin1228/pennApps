import json
import flask
app = flask.Flask(__name__)


@app.route("/getWage")
def getWage():

    wage = 0
    results = json.dumps({"query": query, "results": wage})

    resp = flask.Response(results)


if __name__ == '__main__':
    app.debug = True
    app.run()
