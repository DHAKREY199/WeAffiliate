module.exports = {
  buttonSetting : {
    text: "Services",
    textColor: "#fffccc",
    backgroundColor: "Blue",
    borderColor: "green",
    feedbackTabAlignment: false
  },
  categorySetting: [{
    isDefault: true,
    name: "Like",
    display: true
  }, {
    isDefault: false,
    name: "Question",
    display: true
  }, {
    name: "Problem",
    display: true
  }, {
    name: "Suggestion",
    display: false
  }],
  defaultFields: {
    name: {
      typeOfField:"mandatory",
      label:"Name"
    },
    email:{
      typeOfField:"mandatory",
      label:"Email"
    },
    message:{
      typeOfField:"mandatory",
      label:"Message"
    },
    category: {
      typeOfField:"mandatory",
      label:"Category"
    },
    attachScreenshot: {
      typeOfField:"hidden",
      label:"Click to attach the Screenshot of page"
    }
  },
  thankyouMessage: "Your Feedback is submitted sucessfully",
  styleSetting: "h1{ font-size : 10px} let it keep simple"
  // fieldSetting:[{
  //   fieldType: "dropDownMenu",
  //   label: "Choose from given list",
  //   isCategorySpecific: false,
  //
  // },
  // {
  //   fieldType: "rating",
  //   label: "Rate our service",
  //   isCategorySpecific: false
  // }]
}
