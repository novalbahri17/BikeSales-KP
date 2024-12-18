// Memuat data dari JSON dan menginisialisasi DataTable
fetch("../data/tabledata.json")
.then((resp) => resp.json())
.then((dataTable) => {
    
    // Cek jika tabel sudah diinisialisasi sebagai DataTable dan hancurkan instance yang ada
    if ($.fn.DataTable.isDataTable('#data-table')) {
        $('#data-table').DataTable().destroy();
    }

    // Inisialisasi ulang DataTable
    $('#data-table').DataTable({
        "aaSorting": [],
        columns: [
            { title: 'Country' },
            { title: 'Product' },
            { title: 'Profit' },
            { title: 'Item Sold' },
            { title: 'Revenue' },
        ],
        data: dataTable
    });
});