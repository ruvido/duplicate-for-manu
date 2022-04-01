FILE="$(date +%Y%m%d)-export-all_subscribed.json"
node export-faunadb.js > $FILE
echo $FILE


