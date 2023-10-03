import { showUI, on } from '@create-figma-plugin/utilities'
import _ from "lodash"
import dimension from "@/figma/dimension/dimension.json"
import lightScale from "@/figma/scales/light.json"
import darkScale from "@/figma/scales/dark.json"
import lightTheme from "@/figma/themes/light.json"
import darkTheme from "@/figma/themes/dark.json"


export default function () {
  const options = {
    height: 160,
    width: 240
  }

  const importVariables = () => {
    console.log("dimension", dimension.length)
    console.log("lightScale", lightScale.length)
    console.log("darkScale", darkScale.length)
    console.log("lightTheme", lightTheme.length)
    console.log("darkTheme", darkTheme.length)
    // const variables = _.merge(dimension, lightScale, darkScale, lightTheme, darkTheme)
    const variables = dimension.concat(lightScale, darkScale, lightTheme, darkTheme)
    console.log("variables", variables.length)
    const localCollections = figma.variables.getLocalVariableCollections();
    variables.forEach(variable => {
      let collection = localCollections.find(collection => collection.name === variable.collection)
      if (!collection) {
        collection = figma.variables.createVariableCollection(variable.collection)
        localCollections.push(collection)
      }
      // console.log(variable)
      if (variable.mode !== "dark") {
        const localVariable = figma.variables.createVariable(variable.name, collection.id, variable.type)
        localVariable.setValueForMode(collection.modes[0].modeId, variable.value)
        localVariable.scopes = variable.scopes
      }
    })
    console.log("Finished importing variables")
  }
  on("IMPORT", importVariables)

  showUI(options)
}
