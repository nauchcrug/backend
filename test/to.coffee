ms = 3000
end = (new Date).getTime() + ms
do (->) while (new Date).getTime() < end
console.log '3sec elapsed'
