/* contact.js - handles booking request form interaction (date picker, validation, simulated submit) */
$(function() {
    $("#eventDate").datepicker({ minDate: 0, dateFormat: 'yy-mm-dd' });

    $('#bookingForm').on('submit', function(ev) {
        ev.preventDefault();
        const name = $('#clientName').val().trim();
        const email = $('#clientEmail').val().trim();
        const date = $('#eventDate').val().trim();
        if (!name || !email || !date) {
            $('#bookingDialog').html('<p>Please fill all required fields (name, email, event date).</p>');
            $('#bookingDialog').dialog({ modal: true, title: 'Form validation' });
            return;
        }

        const formData = {
            name: name,
            email: email,
            phone: $('#clientPhone').val().trim(),
            type: $('#eventType').val(),
            date: date,
            message: $('#clientMessage').val().trim()
        };

        console.log('Simulated booking submit:', formData);
        $('#bookingDialog').html(`<p>Thanks, ${name}! Your request for ${formData.type} on ${formData.date} has been received. Madison will contact you at ${email}.</p>`);
        $('#bookingDialog').dialog({ modal: true, title: 'Booking Received' });
        $(this).trigger('reset');
    });
});
