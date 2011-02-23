var zeam_focus_field = function(form) {
    // Focus error field first
    field = form.find('.row_error:first').find('.field:first');
    if (field.length) {
        field.trigger('focus');
    }
    else {
        // Focus first required field otherwise
        form.find('.field-required:first').trigger('focus');
    };
};


var InlineZeamValidator = function(input) {
    this.input = $(input);
    this.name = this.input.attr('name');
    this.value = this.input.attr('value');
};


InlineZeamValidator.prototype.available = function () {
    // Says if the functionality is available or not. We only do it on
    // what we know we can serialize.
    // Don't check for Date Picker
    if (this.input.hasClass('field-date')){
        return false;
    }
    var input_type = this.input.attr('type');
    if (input_type == 'text' || input_type == 'url' ||
        input_type == 'email' || input_type == 'tel' ||
        input_type == 'number') {
        return true;
    };
    return false;
};

InlineZeamValidator.prototype.validate = function () {
    if (!this.available()) {
        return false;
    }
    var self = this;
    var info = {};
    var form_url = this.input.closest('form').attr('action');
    info['name'] = this.name;
    info['value'] = this.value;
    $.ajax({
        url: form_url + '/@@json_validator',
        type: 'POST',
        dataType: 'json',
        data: info,
        success: function(data) {
            if (data['success']) {
                self.clearError();
            }
            else {
                self.setError(data['error']);
            };
        }});
};

InlineZeamValidator.prototype.setError = function (error_text) {
    var cell = this.input.parent();
    var error = cell.find('.error');
    if (!error.length) {
        error = $('<div class="error"></div>');
        cell.after(error);
    };
    error.text(error_text);
    cell.parent().addClass('row_error')
};

InlineZeamValidator.prototype.clearError = function() {
    var cell = this.input.parent();
    var error = cell.next('.error');
    if (error) {
        error.remove();
        cell.parent().removeClass('row_error');
    };
};


$(document).ready(function() {
    // Focus form field
    zeam_focus_field($('.edit-form'));
    // Inline validation
    $('.edit-form').find('.field').live('change', function() {
        var validator = new InlineZeamValidator(this);
        validator.validate();
        return true;
    });

});
