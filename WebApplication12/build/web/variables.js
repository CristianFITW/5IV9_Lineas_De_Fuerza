"use strict"

const k = 89900; // k = 8.99 * Math.pow(10, -9) adjusted because all charges are in micro coulombs;

const gridSize = 25;
const chargeDiameter = 40; // diameter of a point charge
const chargeRadius = chargeDiameter / 2;
const testChargeDiameter = 10;
const testChargeRadius = testChargeDiameter / 2;

const testChargeCharge = 0.000005; //q = 5 micro coulombs;
const fieldLinesPerCoulomb = 4;
const equiLinesAccuracy = 0.125; 
const equiLinesLimit = 4500;
const voltageAccuracy = 30;

const positiveChargeColor = "rgb(210, 41, 45)";
const negativeChargeColor = "rgb(23, 97, 176)";
const neutralChargeColor = "rgba(85, 85, 85, 0.75)";

const fieldVectorScale = 500; // this constant scales the size of the arrows in the field vector mode. The arrows get smaller as the constant gets bigger

const defaultFont = "Times New Roman";
const buttonFont = "Arial";

let showFieldLines, 
showFieldVectors, 
showEquipotentialLines, 
showVoltage, 
testChargeMode, 
createGrid, 
showPopUp, 
fullscreen,
showVoltageValue;

let currentPopUp = 0;
let helpImages = []
let helpButtons = []
let helpText = []

let foreGroundCanvas;
let backgroundCanvas;
let mousePosition;

let showContextMenu = false;
let contextMenuPosition; 

let charges = []; // all charges on screen are stored here
let testCharges = []; // all test charges on screen are stored here

let buttons = [];
let contextMenuButtons = []; 
let checkBoxes = [];

let fieldVectors = [];
let fieldLines = [];
let fieldLineArrows = [];
let equiLines = []; // "equipotentialLines" but shortened
let voltageMap = [];

let numberOfNegativeCharges;
let noPositiveCharges;

let popUpCloseButton;

let sidePanelWidth = 300;
let snapToGrid = false;
let menuOpen = true;
let QRCode;
let showQRCode = false; 
let showHelp = true; 
let icons;