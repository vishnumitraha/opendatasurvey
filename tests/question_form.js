'use strict';

require('jsdom-global')();
const React = require('react'); // eslint-disable-line no-unused-vars
const mount = require('enzyme').mount;
const expect = require('chai').expect;
const QuestionForm = require('../census/ui_app/QuestionForm');

let qsSchema = [
  {
    defaultProperties: {
      enabled: true,
      required: true,
      visible: true
    },
    id: 'like_apples',
    position: 1
  },
  {
    defaultProperties: {
      enabled: false,
      required: false,
      visible: false
    },
    id: 'bananas_instead',
    if: [
      {
        providerId: 'like_apples',
        properties: {
          enabled: true,
          required: true,
          visible: true
        },
        value: 'No'
      }
    ],
    position: 1.1
  },
  {
    defaultProperties: {
      enabled: false,
      required: false,
      visible: true
    },
    id: 'apple_colour',
    if: [
      {
        providerId: 'like_apples',
        properties: {
          enabled: true,
          required: true
        },
        value: 'Yes'
      }
    ],
    position: 2
  },
  {
    defaultProperties: {
      enabled: false,
      required: false,
      visible: true
    },
    id: 'red_apple_today',
    if: [
      {
        providerId: 'apple_colour',
        properties: {
          enabled: true,
          required: true
        },
        value: 'Yes'
      }
    ],
    position: 3
  },
  {
    defaultProperties: {
      enabled: false,
      required: false,
      visible: false
    },
    id: 'doctor_away',
    if: [
      {
        providerId: 'red_apple_today',
        properties: {
          enabled: true,
          visible: true
        },
        value: 'Yes'
      }
    ],
    position: 3.1
  }
];

let questions = [
  {
    id: 'like_apples',
    text: 'Do you like apples?',
    type: 'yesno'
  },
  {
    id: 'bananas_instead',
    text: 'Do you like bananas instead?',
    type: 'yesno'
  },
  {
    id: 'apple_colour',
    text: 'Do you like *RED* apples?',
    type: 'yesno'
  },
  {
    id: 'red_apple_today',
    text: 'Have you eaten a red apple today?',
    type: 'yesno'
  },
  {
    id: 'doctor_away',
    text: 'Did it keep the doctor away?',
    type: 'yesno'
  }
];

describe('<QuestionForm />', () => {
  describe('QuestionFields have correct initial state', function() {
    beforeEach(function () {
      this.wrapper =
        mount(<QuestionForm questions={questions} qsSchema={qsSchema} />);
    });

    it('renders list of Questions', function() {
      expect(this.wrapper.find('QuestionFieldYesNo')).to.have.length(5);
    });

    it('first question', function() {
      // first question
      expect(this.wrapper.ref('like_apples').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').visible).is.true;
    });

    it('second question', function() {
      // second question
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').visible).is.true;
    });

    it('third question', function() {
      // third question
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').visible).is.false;
    });

    it('fourth question', function() {
      // fourth question
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').visible).is.true;
    });

    it('fifth question', function() {
      // fifth question
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').visible).is.false;
    });
  });

  describe('QuestionFields have correct state after Q1. "Yes"', function() {
    beforeEach(function () {
      this.wrapper =
        mount(<QuestionForm questions={questions} qsSchema={qsSchema} />);
      this.wrapper.ref('like_apples').find('input[value="Yes"]').simulate('change');
    });

    it('first question', function() {
      // first question
      expect(this.wrapper.ref('like_apples').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').visible).is.true;
    });

    it('second question', function() {
      // second question
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').visible).is.true;
    });

    it('third question', function() {
      // third question
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').visible).is.false;
    });

    it('fourth question', function() {
      // fourth question
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').visible).is.true;
    });

    it('fifth question', function() {
      // fifth question
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').visible).is.false;
    });
  });

  describe('QuestionFields have correct state after Q1. "No"', function() {
    beforeEach(function () {
      this.wrapper =
        mount(<QuestionForm questions={questions} qsSchema={qsSchema} />);
      this.wrapper.ref('like_apples').find('input[value="No"]').simulate('change');
    });

    it('first question', function() {
      // first question
      expect(this.wrapper.ref('like_apples').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').visible).is.true;
    });

    it('second question', function() {
      // second question
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').visible).is.true;
    });

    it('third question', function() {
      // third question
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').visible).is.true;
    });

    it('fourth question', function() {
      // fourth question
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').visible).is.true;
    });

    it('fifth question', function() {
      // fifth question
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').visible).is.false;
    });
  });

  describe('QuestionFields have correct state after Q1. "Yes" Q2. "Yes', function() {
    beforeEach(function () {
      this.wrapper =
        mount(<QuestionForm questions={questions} qsSchema={qsSchema} />);
      this.wrapper.ref('like_apples').find('input[value="Yes"]').simulate('change');
      this.wrapper.ref('apple_colour').find('input[value="Yes"]').simulate('change');
    });

    it('first question', function() {
      // first question
      expect(this.wrapper.ref('like_apples').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').visible).is.true;
    });

    it('second question', function() {
      // second question
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').visible).is.true;
    });

    it('third question', function() {
      // third question
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').visible).is.false;
    });

    it('fourth question', function() {
      // fourth question
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').visible).is.true;
    });

    it('fifth question', function() {
      // fifth question
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').visible).is.false;
    });
  });

  describe('QuestionFields have correct state after Q1. "Yes" Q2. "Yes" Q4. "Yes"', function() {
    beforeEach(function () {
      this.wrapper =
        mount(<QuestionForm questions={questions} qsSchema={qsSchema} />);
      this.wrapper.ref('like_apples').find('input[value="Yes"]').simulate('change');
      this.wrapper.ref('apple_colour').find('input[value="Yes"]').simulate('change');
      this.wrapper.ref('red_apple_today').find('input[value="Yes"]').simulate('change');
    });

    it('first question', function() {
      // first question
      expect(this.wrapper.ref('like_apples').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('like_apples').prop('visibleProps').visible).is.true;
    });

    it('second question', function() {
      // second question
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('apple_colour').prop('visibleProps').visible).is.true;
    });

    it('third question', function() {
      // third question
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').enabled).is.false;
      expect(this.wrapper.ref('bananas_instead').prop('visibleProps').visible).is.false;
    });

    it('fourth question', function() {
      // fourth question
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').required).is.true;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('red_apple_today').prop('visibleProps').visible).is.true;
    });

    it('fifth question', function() {
      // fifth question
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').required).is.false;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').enabled).is.true;
      expect(this.wrapper.ref('doctor_away').prop('visibleProps').visible).is.true;
    });
  });
});
