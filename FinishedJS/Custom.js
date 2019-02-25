function MakeModel() {
    var table = $('#StudentTable > tbody tr');
    var vamps = 0;
    var rows = 0;
    $(table).each(function (i, row) {
        rows++;
        var $row = $(row),
            $shadow = $row.find('select[name*="shadow"]'),
            $complexion = $row.find('select[name*="complexion"]'),
            $garlic = $row.find('select[name*="garlic"]');
        vamps += IsVamp($shadow, $complexion, $garlic);
    });

    SetGraph(vamps, (rows - vamps));
    $('#myModal').modal('show');

}

function IsVamp(shadow, complexion, garlic) {

    var total = 0;
    if ($(shadow).val() === "No") {
        total += 4;
    }
    if ($(complexion).val() === "Yes") {
        total += 3;
    }
    if ($(garlic).val() === "No") {
        total += 3;
    }

    if (total > 6)
        return 1;
    else
        return 0;
}

function SetTable(amount) {
    var a = $(amount).val();
    var table = $('#StudentTable > tbody');
    $(table).empty();
    for (i = 0; i < a; i++) {
        $(table).append('<tr><td>' + (i + 1) + '</td >\
            <td>\
                <select class="form-control" name="shadow">\
                    <option>Yes</option>\
                    <option>No</option>\
                </select>\
            </td>\
            <td>\
                <select class="form-control" name="complexion">\
                    <option>No</option>\
                    <option>Yes</option>\
                </select>\
            </td>\
            <td>\
                <select class="form-control" name="garlic">\
                    <option>Yes</option>\
                    <option>No</option>\
                </select>\
            </td>\
                </tr >');
    }
}

function SetGraph(vamps, nonvamps) {
    var ctx = document.getElementById("myCanvas").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [vamps, nonvamps],
                backgroundColor: ['rgba(255,0,0,.5)', 'rgba(0,0,255,.5)']
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Vampires',
                'Not Vampires'
            ]
        }
    });
}

function LoadModel(input) {
    if ($(input).val() === "Random Input")
    {
        var $numStud = $("#NumberOfStudents");
        $numStud.val(Math.floor(Math.random() * 10));
        SetTable($numStud);
        var table = $('#StudentTable > tbody tr');
        $(table).each(function (i, row) {
            var $row = $(row),
                $shadow = $row.find('select[name*="shadow"]'),
                $complexion = $row.find('select[name*="complexion"]'),
                $garlic = $row.find('select[name*="garlic"]');

            $shadow.prop('selectedIndex', Math.random() > .5 ? 1 : 0);
            $complexion.prop('selectedIndex', Math.random() > .5 ? 1 : 0);
            $garlic.prop('selectedIndex', Math.random() > .5 ? 1 : 0);

        });
    }
    else {
        $('#StudentTable > tbody').empty();
    }
}