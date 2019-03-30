reset 
set datafile separator ","
set key autotitle columnhead
plot 'MCA.csv' using 1:2 with steps lw 3, \
     'MCA.csv' using 1:3 with steps lw 3
stats 'MCA.csv' using 2 name 'ext'
stats 'MCA.csv' using 3 name 'int'
print ext_sum/5., int_sum/5.