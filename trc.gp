reset 
set datafile separator ","
set key autotitle columnhead

plot 'ADC.csv' using 1:2 with lines lw 3, \
     'ADC.csv' using 1:3 with lines lw 3

