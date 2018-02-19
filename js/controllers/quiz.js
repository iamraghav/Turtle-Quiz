(function() {

  angular
    .module("turtleFacts")
    .controller("quizCtrl", QuizController);

    QuizController.$inject = ['quizMetrics', 'DataService'];

    function QuizController(quizMetrics, DataService) {

      var vm = this;

      vm.quizMetrics = quizMetrics;
      vm.dataService = DataService;
      vm.questionAnswered = questionAnswered;
      vm.setActiveQuestion =setActiveQuestion;
      vm.activeQuestion = 0;

      var numQuestionAnswered = 0;

      function setActiveQuestion() {
        var breakOut = false;
        var quizLength = DataService.quizQuestions.length - 1;

        while(!breakOut) {
          vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;

          if(DataService.quizQuestions[vm.activeQuestion].selected === null) {
            breakOut = true;
          }
        }
      }

      function questionAnswered() {

        if(DataService.quizQuestions[vm.activeQuestion].selected !== null) {

          var quizLength = DataService.quizQuestions.length;
          numQuestionAnswered++;
          if(numQuestionAnswered >= quizLength) {
            //finalize quiz

          }
        }
        vm.setActiveQuestion();
      }
    }

})();
