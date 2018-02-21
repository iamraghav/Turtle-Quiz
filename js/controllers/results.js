(function() {
  /*
     * attaching results controller function to the turtleFacts module 
     */
  angular.module("turtleFacts").controller("resultsCtrl", ResultsController);


  ResultsController.$inject = ["quizMetrics", "DataService"];


  function ResultsController(quizMetrics, DataService) {
    var vm = this;


    vm.quizMetrics = quizMetrics; // binding the object from factory to vm
    vm.dataService = DataService;
    vm.getAnswerClass = getAnswerClass; // named function defined below
    vm.setActiveQuestion = setActiveQuestion; // named function defined below
    vm.reset = reset; // named function defined below
    vm.calculatePerc = calculatePerc; // named function defined below
    vm.activeQuestion = 0;

    function calculatePerc() {
      /*
             * simply calculating the percentage of correct answers and returning the number
             */
      return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
    }

    function setActiveQuestion(index) {
      /*
             * setting active question on the results page
             */
      vm.activeQuestion = index;
    }

    function getAnswerClass(index) {

      if (index === quizMetrics.correctAnswers[vm.activeQuestion]) {
        return "bg-success";
      } else if (
        index === DataService.quizQuestions[vm.activeQuestion].selected
      ) {
        return "bg-danger";
      }
    }

    function reset() {
      /*
             * reseting all the data. This includes reverting the results state
             * back to false which will return the view to the lists.
             *
             * Also all the variables on each question object is returned to 
             * the default state using the for loop to iterate through all 
             * questions.
             */
      quizMetrics.changeState("results", false);
      quizMetrics.numCorrect = 0;

      for (var i = 0; i < DataService.quizQuestions.length; i++) {
        var data = DataService.quizQuestions[i]; //binding the current question to data to keep code clean

        data.selected = null;
        data.correct = null;
      }
    }
  }
})();
