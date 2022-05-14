// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultsampleArray = samplesArray.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var sampleResult = resultsampleArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds =   sampleResult.otu_ids;
    var otuLabels = sampleResult.otu_labels;
    var sampleValues =sampleResult.sample_values;
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var Sortotu_ids=otuIds.sort((a,b)=>b.otu_ids-a.otu_ids)
    var top10Ids=Sortotu_ids.slice(0,10).reverse();
    var yticks=top10Ids.map(id=>"OTU" +"_Id" +":"+id)
    console.log(yticks)

    // 8. Create the trace for the bar chart. 
    var sortedSamplevalues=sampleValues.sort((a,b)=>a.sample_values-b.sample_values)
    var top10Samplevalues=sortedSamplevalues.slice(0,10).reverse()
    var tenoutlabel=otuLabels.slice(0,10).reverse()
    


    var barData = [{
        x: top10Samplevalues,
        y:yticks,
        text: tenoutlabel,
        type: "bar"
      }];
      
    var barLayout = {
      title: "Top 10 Bacteria Speicies Found in belly button",
      yaxis: {
        tickmode: "array",
        tickvals: [0,1,2,3,4,5,6,7,8,9],
        ticktext: yticks
      },
      
      annotations: [{
        xref: 'paper',
        yref: 'paper',
        x: 0.5,
        xanchor: 'center',
        y: -0.25,
        yanchor: 'center',
        text: 'The chart shows the top ten  bacterial species <br> and the crossponding number of samples found in  belly button',
         showarrow: false
      }]
    };
  
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout, {responsive: true});
  });
}

 // 1. Create the trace for the bubble chart.
 var bubbleData = [{
  x: otuIds,
  y: sampleValues,
  text: otuLabels,
  mode: 'markers',
  marker: {
    size: sampleValues,
    color: otuIds,
    colorscale: "Earth"
  }
}];
console.log(bubbleData);
// 2. Create the layout for the bubble chart.
var bubbleLayout = {
  title: 'Bacteria Spicies',
  // showlegend: false,
  // xaxis: {title: "OTU ID", automargin: true},
  // yaxis: {automargin: true},
  //margin: { t: 50, r: 50, l: 50, b: 50 },
  // hovermode: "closest"

  annotations: [{
    xref: 'paper',
    yref: 'paper',
    x: 0.5,
    xanchor: 'center',
    y: -0.25,
    yanchor: 'center',
    text: 'the size of the bubles shows the number of smaple bacterial species found in belly button',
     showarrow: false
  }]
};

// 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bubble", bubbleData, bubbleLayout, {responsive: true});
