/**
 * Make HTML text input control searchable.
 *
 * How to use:
 *   fieldAutocomplete.init({fields: '#from', data: airports})
 *   fieldAutocomplete.init({fields: '#from, #to', data: airports})
 *
 * Dependencies:
 *   - jQuery: https://jquery.com/
 *   - Fuse: https://fusejs.io/
 */
var fieldAutocomplete = {
  init: function (settings) {
    fieldAutocomplete.config = {
      fields: null, // Field(s) selectors
      data: [], // List of items to search in
      fuseOptions: {
        shouldSort: true,
        threshold: 0.4,
        maxPatternLength: 32,
        keys: [
          {
            name: 'iata',
            weight: 0.5,
          },
          {
            name: 'name',
            weight: 0.3,
          },
          {
            name: 'city',
            weight: 0.2,
          },
        ],
      },
    };

    // Overriding the default config
    $.extend(fieldAutocomplete.config, settings);

    // Internal variables (optional to declare)
    fieldAutocomplete.fuse = null;
    fieldAutocomplete.results = [];
    fieldAutocomplete.numResults = 0;
    fieldAutocomplete.selectedIndex = -1;

    // Setup
    fieldAutocomplete.setup();
  },

  setup: function () {
    // Set up Fuse
    fieldAutocomplete.fuse = new Fuse(
      fieldAutocomplete.config.data,
      fieldAutocomplete.config.fuseOptions
    );

    // Set up DOM for each `field`
    $.each($(fieldAutocomplete.config.fields), function (_, elem) {
      $(this)
        .on('click', function (e) {
          e.stopPropagation();
        })
        .on('focus keyup', fieldAutocomplete.search)
        .on('keydown', fieldAutocomplete.onKeyDown);

      // Wrap `autocomplete-wrapper` around the `field`
      var $wrap = $('<div>')
        .addClass('autocomplete-wrapper')
        .insertBefore($(this))
        .append($(this));

      // Append `autocomplete-results` to the `autocomplete-wrapper`
      $('<div>')
        .addClass('autocomplete-results')
        .on('click', '.autocomplete-result', function (e) {
          e.preventDefault();
          e.stopPropagation();
          fieldAutocomplete.selectIndex($(elem), $(this).data('index'));
        })
        .appendTo($wrap);
    });

    // Highlight when hover over the autocomplete result list item
    $(document)
      .on('mouseover', '.autocomplete-result', function (e) {
        var index = parseInt($(this).data('index'), 10);
        if (!isNaN(index)) {
          $(this).parent().attr('data-highlight', index);
        }
      })
      .on('click', null, fieldAutocomplete.clearResults);
  },

  clearResults: function () {
    var $list = $('.autocomplete-results');
    fieldAutocomplete.results = [];
    fieldAutocomplete.numResults = 0;
    $list.empty();
  },

  selectIndex: function ($field, index) {
    if (fieldAutocomplete.results.length >= index + 1) {
      $field.val(fieldAutocomplete.results[index].iata);
      fieldAutocomplete.clearResults();
    }
  },

  search: function (e) {
    if (e.which === 38 || e.which === 13 || e.which === 40) {
      return;
    }

    var $list = $(this).parent().find('.autocomplete-results');
    if ($(this).val().length > 0) {
      fieldAutocomplete.results = _.take(
        fieldAutocomplete.fuse.search($(this).val()),
        7
      );
      fieldAutocomplete.numResults = fieldAutocomplete.results.length;

      var divs = fieldAutocomplete.results.map(function (r, i) {
        return (
          '<div class="autocomplete-result" data-index="' +
          i +
          '">' +
          '<div><b>' +
          r.iata +
          '</b> - ' +
          r.name +
          '</div>' +
          '<div class="autocomplete-location">' +
          r.city +
          ', ' +
          r.country +
          '</div>' +
          '</div>'
        );
      });

      fieldAutocomplete.selectedIndex = -1;
      $list
        .html(divs.join(''))
        .attr('data-highlight', fieldAutocomplete.selectedIndex);
    } else {
      fieldAutocomplete.numResults = 0;
      $list.empty();
    }
  },

  onKeyDown: function (e) {
    var $list = $(this).parent().find('.autocomplete-results');

    switch (e.which) {
      case 38: // up
        fieldAutocomplete.selectedIndex--;
        if (fieldAutocomplete.selectedIndex <= -1) {
          fieldAutocomplete.selectedIndex = -1;
        }
        $list.attr('data-highlight', fieldAutocomplete.selectedIndex);
        break;
      case 13: // enter
        fieldAutocomplete.selectIndex($(this), fieldAutocomplete.selectedIndex);
        break;
      case 9: // enter
        fieldAutocomplete.selectIndex($(this), fieldAutocomplete.selectedIndex);
        e.stopPropagation();
        return;
      case 40: // down
        fieldAutocomplete.selectedIndex++;
        if (fieldAutocomplete.selectedIndex >= fieldAutocomplete.numResults) {
          fieldAutocomplete.selectedIndex = fieldAutocomplete.numResults - 1;
        }
        $list.attr('data-highlight', fieldAutocomplete.selectedIndex);
        break;

      default:
        return; // exit this handler for other keys
    }
    e.stopPropagation();
    e.preventDefault(); // prevent the default action (scroll / move caret)
  },
};
