"use strict"

function createSidePanel()
{
    let canvas = foreGroundCanvas;
    buttons = []
    checkBoxes = []

    let buttonHalfWidth = 100;
    let buttonFullWidth = 205;
    let buttonHeight = 35;

    let checkBoxWidth = 100;

    let col1 = innerWidth - 260;
    let col2 = innerWidth - 155;

    buttons.push(
        new Button({position: canvas.createVector(innerWidth - 280 - (buttonHeight / 4), 10 - (buttonHeight / 4)), width: buttonHeight, height: buttonHeight, image: icons[3], onClick: () => menuOpen = !menuOpen }));

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 50), height: 20, width: checkBoxWidth, text: "Líneas De Campo",          value: true, onClick: function(){ showFieldLines = this.value; if (this.value) { createFieldLines() } } }),
        new CheckBox({position: canvas.createVector(col1, 75), height: 20, width: checkBoxWidth, text: "Vectores De Campo",        value: false, onClick: function(){ showFieldVectors = this.value; if (this.value) { createFieldVectors() } } }),
        new CheckBox({position: canvas.createVector(col1, 100), height: 20, width: checkBoxWidth, text: "Líneas Equipotenciales", value: false, onClick: function(){ showEquipotentialLines = this.value; equiLines = []; }, hoverText: "Presiona Culaquier Punto En El Plano Para Trazar Una Linea Equipotencial" }),
        new CheckBox({position: canvas.createVector(col1, 125), height: 20, width: checkBoxWidth, text: "Voltaje",             value: false, onClick: function(){ showVoltage = this.value; if (this.value) { createVoltage() } } }),
        new CheckBox({position: canvas.createVector(col1 + 20, 150), height: 20, width: checkBoxWidth, text: "Valor Numérico",     value: false, onClick: function(){ showVoltageValue = this.value } }),
        new CheckBox({position: canvas.createVector(col1, 175), height: 20, width: checkBoxWidth, text: "Mostrar Cuadrícula",           value: true,  onClick: function(){ createGrid = this.value; } }),
        new CheckBox({position: canvas.createVector(col1 + 20, 200), height:20, width:checkBoxWidth, text:"Ajustar A La Cuadrícula",      value: false, onClick: function(){ snapToGrid = this.value; if (this.value) { checkBoxes[4].value = true; createGrid = true;} } }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 265), width: buttonHalfWidth, height: buttonHeight, text: "Carga Individual", onClick: function(){ createPreset('single') } }),
        new Button({position: canvas.createVector(col2, 265), width: buttonHalfWidth, height: buttonHeight, text: "Dipolo", onClick: function(){ createPreset('dipole') } }),
        new Button({position: canvas.createVector(col1, 305), width: buttonHalfWidth, height: buttonHeight, text: "Fila De Cargas", onClick: function(){ createPreset('row') } }),
        new Button({position: canvas.createVector(col2, 305), width: buttonHalfWidth, height: buttonHeight, text: "Fila De Dipolos", onClick: function(){ createPreset('dipole row') } }),
        new Button({position: canvas.createVector(col1, 345), width: buttonFullWidth, height: buttonHeight, text: "Cargas Aleatoria", onClick: function(){ createPreset("random"); } }),
        new Button({position: canvas.createVector(col1, 385), width: buttonFullWidth, height: buttonHeight, text: "Eliminar Cargas Del Plano", onClick: function(){ createPreset(null); testCharges=[];} }));

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 465), height: 20, width: checkBoxWidth, text: "Modo De Carga De Prueba", value: false, onClick: function(){ testChargeMode = this.value; }, hoverText: "Presiona Cualquier Punto En El Plano Para Colocar Una Carga De Prueba" }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 490), width: buttonFullWidth, height: buttonHeight, text: "Plano Con Cargas De Prueba", onClick: function(){ testChargeMode = true; createTestChargeMap(); checkBoxes[6].value = true; testChargeMode = true;} }),
        new Button({position: canvas.createVector(col1, 530), width: buttonFullWidth, height: buttonHeight, text: "Limpiar Plano De Cargas De Pruebas", onClick: function(){ testCharges = []; } })
        );
}

function bottomButtons(i)
{
    if (i == 0) 
    {
        saveAsPNG();
    }
}
function displaySidePanel()
{
    let canvas = foreGroundCanvas;

    let moveAmmount = 10;
    let moveScale = 1.15;
    let burgerMove = 1.7;

    if (menuOpen) 
    {
        if (sidePanelWidth < 300) 
        {
            sidePanelWidth += moveAmmount;

            buttons.forEach(button => 
            {
                button.position.x -= moveAmmount * moveScale;
            });
            buttons[0].position.x += burgerMove;
            
            checkBoxes.forEach(checkBox => {
                checkBox.position.x -= moveAmmount * moveScale;
            })
        }  
    }
    else
    {
        if (sidePanelWidth > 50) 
        {
            buttons.forEach(button => 
            {
                button.position.x += moveAmmount * moveScale;
            });
            buttons[0].position.x -= burgerMove;
            
            checkBoxes.forEach(checkBox => {
                checkBox.position.x += moveAmmount * moveScale;
            })
            sidePanelWidth -= moveAmmount;
        }  
    }

    canvas.push()
        canvas.fill(255)
        canvas.rect(innerWidth - sidePanelWidth, 0, sidePanelWidth, innerHeight)

        canvas.fill(0);
        canvas.noStroke();
        canvas.textSize(16);
        
        canvas.text("Premade Configurations: ", buttons[1].position.x, 260);

        // Texto adicional 1
        canvas.text("Gonzalez Nava Rodrigo Yael", buttons[1].position.x, 700);

        // Texto adicional 2
        canvas.text("Gutierrez Flores Cristian", buttons[1].position.x, 730);

        // Texto adicional 3
        canvas.text("Mendoza Sanchez Carlos", buttons[1].position.x, 760);

        canvas.imageMode(canvas.CENTER);

        canvas.fill(100);
        canvas.textSize(12);
        canvas.textFont(buttonFont);

    canvas.pop()
}


function createDataFromSidePanel() 
{
    noPositiveCharges = !charges.some(charge => charge.charge > 0);

    if (showVoltage) createVoltage();
    
    if (showFieldLines) createFieldLines();
    
    if (showFieldVectors) createFieldVectors();
}

function displayDataFromSidePanel()
{
  if (createGrid) displayGrid(); 

  if (showEquipotentialLines) displayEquipotentialLines(); 

  if (showFieldLines) displayFieldLines(); 

  if (showFieldVectors) displayFieldVectors(); 

  if (testChargeMode) displayTestCharges(); 

  if (showVoltageValue) showVoltageValueOnCursor();
}
