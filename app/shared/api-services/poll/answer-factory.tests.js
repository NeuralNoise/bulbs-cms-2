'use strict';

describe('Answer Factory', function () {
  var $httpBackend;
  var Answer;
  var answer;
  var mockPayload;
  var response;
  var scope;
  var pollId;

  beforeEach(module('apiServices.answer.factory'));

  beforeEach(inject(function(_$httpBackend_, _Answer_) {
    Answer = _Answer_;
    $httpBackend = _$httpBackend_;

    mockPayload = {
      id: 203,
      answer_text: 'texty text',
      answer_image: { id: 12345 },
      poll: 123456
    };

  }));

  describe('postAnswer()', function () {
    it('makes a post request', function () {
      answer = {id: 2, notOnSodahead: true, answer_text: 'wingapo'};
      pollId = 12;
      Answer.postAnswer(answer, pollId);
      $httpBackend.expectPOST('/poll-answer/').respond(201);
      $httpBackend.flush();
    });

    it('posts answer_images', function () {
      answer = {
        id: 2,
        notOnSodahead: true,
        answer_text: 'wingapo',
        answer_image: { id: 14784 }
      };
      pollId = 12;
      Answer.postAnswer(answer, pollId);
      $httpBackend.expectPOST('/poll-answer/').respond(201);
      $httpBackend.flush();
    });

    it('returns answer payload', function() {
      answer = {id: 2, notOnSodahead: true, answer_text: 'wingapo'};
      pollId = 12;
      Answer.postAnswer(answer, pollId).then(function(res) {
        response = res;
      });
      $httpBackend.expectPOST('/poll-answer/').respond(201, mockPayload);
      $httpBackend.flush();
      expect(response).toEqual(mockPayload);
    });

    it('throws error if poll id is not a number', function() {
      var answerPost = function() {
        Answer.postAnswer({answer_text: 'bad data'}, 'this is a string');
      };
      expect(answerPost).toThrow('Poll Error: poll id and answer_text fields required');
    });

    it('throws error if answer_text is nil', function() {
      var answerPost = function() {
        Answer.postAnswer('bad data', 1235);
      };
      expect(answerPost).toThrow('Poll Error: poll id and answer_text fields required');
    });
  });

  describe('updatePollAnswers()', function () {
    it('deletes any answers in deletedAnswers', function () {
      scope = {
        deletedAnswers:  [{ id: 1, answer_text: 'Go Spurs Go!' }],
        model: {
          id: 777,
          answers: []
        }
      };
      Answer.updatePollAnswers(scope);
<<<<<<< HEAD
      $httpBackend.expectDELETE('/poll-answer/1/').respond(201);
=======
      $httpBackend.expectDELETE('/cms/api/v1/answer/1').respond(201);
>>>>>>> old-bulbs-cms/master
      $httpBackend.flush();
    });

    it('posts answers tagged notOnSodahead', function () {
      scope = {
        deletedAnswers:  [],
        model: {
          id: 777,
        },
        answers: [{id: 2, notOnSodahead: true, answer_text: 'foobar'}]
      };
      Answer.updatePollAnswers(scope);
      $httpBackend.expectPOST('/poll-answer/').respond(201);
      $httpBackend.flush();
    });

    it('updates existing answers', function () {
      scope = {
        deletedAnswers:  [],
        model: {
          id: 777,
          answers: [{id: 5, notOnSodahead: false, answer_text: 'nothing'}]
        },
        answers: [{id: 5, answer_text: 'feel the flo'}]
      };
      Answer.updatePollAnswers(scope);
      $httpBackend.expectPUT('/poll-answer/5/').respond(201);
      $httpBackend.flush();
    });

    it('adds images to existing answers', function () {
      scope = {
        deletedAnswers:  [],
        model: {
          id: 777,
          answers: [{id: 5, notOnSodahead: false, answer_text: 'nothing'}]
        },
        answers: [{
          id: 5,
          notOnSodahead: false,
          answer_text: 'nothing',
          answer_image: {id: 12345}
        }]
      };
      Answer.updatePollAnswers(scope);
      $httpBackend.expectPUT('/poll-answer/5/').respond(201);
      $httpBackend.flush();
    });

    it('updates existing answer images', function () {
      scope = {
        deletedAnswers:  [],
        model: {
          id: 777,
          answers: [{
            id: 5,
            notOnSodahead: false,
            answer_text: 'nothing',
            answer_image: { id: 12345 }
          }]
        },
        answers: [{
          id: 5,
          notOnSodahead: false,
          answer_text: 'nothing',
          answer_image: { id: 47896 }
        }]
      };
      Answer.updatePollAnswers(scope);
      $httpBackend.expectPUT('/poll-answer/5/').respond(201);
      $httpBackend.flush();
    });

    it('deletes existing answer images', function () {
      scope = {
        deletedAnswers:  [],
        model: {
          id: 777,
          answers: [{
            id: 5,
            notOnSodahead: false,
            answer_text: 'nothing',
            answer_image: { id: 12345 }
          }]
        },
        answers: [{
          id: 5,
          notOnSodahead: false,
          answer_text: 'nothing',
          answer_image: undefined
        }]
      };
      Answer.updatePollAnswers(scope);
      $httpBackend.expectPUT('/poll-answer/5/').respond(201);
      $httpBackend.flush();
    });
  });
});
