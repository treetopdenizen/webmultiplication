/*  <div class = "equation">
<div class = "factor1">4</div>
<div class = "row"><div class = "operand">x</div>
<div class = "factor2">9</div></div>
<div class = "divider"> </div>
<div class = "product">36</div>
</div> */
var start

var f1, f2

var pairsGroup = {
    "Fives" : [[2,5],[3,5], [4,5], [5,5], [5,2]],
    "Sixes" : [[0,6],[1,6],[2,6],[3,6]]
};

var sessionObject = {
    problemsAsked: []
}

var state = {
    "selectedGroup": "Fives"
}

function random_equation() {
    //f1 = Math.floor(Math.random()*10);
    //f2 = Math.floor(Math.random()*10);
    var group = pairsGroup[state["selectedGroup"]];
    var pair = group[Math.floor(Math.random()*group.length)];
    var randomSelection = Math.floor(Math.random()*2);
    f1 = pair[randomSelection];
    f2 = pair[(randomSelection+1)%2];
    var equation = document.getElementById("equation");
    if (equation) {
        var parentNode = equation.parentNode;
        parentNode.removeChild(equation);
    }
    var flexbox = document.getElementById("flexbox");
    flexbox.appendChild(create_equation(f1,f2,f1*f2));
    document.getElementById("answer").addEventListener("keydown", check_answer)
    document.getElementById("answer").focus();
}

function create_equation (f1, f2, p)
{
    start = new Date()
    var equation = document.createElement("div");
    equation.setAttribute("id","equation");
    equation.setAttribute("class","equation");
    var factor1 = document.createElement("div");
    factor1.setAttribute("class","factor1");
    factor1.textContent = f1;
    equation.appendChild(factor1);
    var row = document.createElement("div");
    row.setAttribute("class","row");
    equation.appendChild(row);
    var operand = document.createElement("div");
    operand.setAttribute("class","operand")
    operand.textContent = "x";
    row.appendChild(operand)
    var factor2 = document.createElement("div");
    factor2.setAttribute("class","factor2");
    factor2.textContent = f2;
    row.appendChild(factor2);
    var divider = document.createElement("div");
    divider.setAttribute("class","divider");
    equation.appendChild(divider);
    var product = document.createElement("input");
    product.setAttribute("class","product");
    product.setAttribute("type","text");
    product.setAttribute("id","answer");
    product.textContent = p;
    equation.appendChild(product);
    return equation;
}

function check_answer (event)
{
    if (event.key === "Enter")
    {
        x = document.getElementById("answer").value

        if (f1*f2 === parseInt(x))
        {
            console.log("That is Correct")
        }
        else
        {
            console.log("That is wrong")
        }
        var stop = new Date()
        sessionObject.problemsAsked.push({
            "fact": [f1,f2],
            "answer": parseInt(x),
            "time": stop-start
        })
        random_equation();
    }
}

function generate_selections() {
    var selection = document.createElement("select");
    for (const group in pairsGroup) {
        var option = document.createElement("option");
        option.value=group;
        option.textContent = group;
        selection.appendChild(option);
    }
    selection.onchange = selection_change;
    var containingDiv = document.getElementById("problemSelection");
    containingDiv.appendChild(selection);
}

function selection_change(event) {
    // update state
    state["selectedGroup"] = event.target.value;
    // update equation
    random_equation();
}

function setup() {
    // Display Selection box
    generate_selections();
    // Populate initial equation
    random_equation();
}

setup();
