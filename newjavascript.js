/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

  var player = ['P1','P2','P3','P4','P5' ];
    var player_score = new Array;
    var i = 0;
    var hole =0;
    var m1=0;
    var m2=0;
    var m3=0;
    var mm1=0,mm2=0,mm3=0;
    var k1=0,k2=0,k3=0;
    var par = [4,4,4,4,4,3,4,4,4,4,4,4,5,3,4,4,3,4];
    var g1=6,g2=6,g3=6;
    var gs1=0;
    var w2=0;
    var way_string;
    var wl=0;
    var skin = new Array;
    

$(function () {
    if (typeof(Storage) !== "undefined") {
   $('#storage').html("test");
} else {
     $('#storage').html("bad");
    // Sorry! No Web Storage support..
}
    for ( i = 0; i < 5 ;i++) {
        player_score[i] = new Array(18);
        skin[i] = new Array(18);
    }
        for (var row=0;row<player_score.length;row++){
          for (var col=0;col< 18;col++){
              player_score[row][col]=0;
              skin[row][col] = false;
          }             
      }
    
    var str=localStorage.getItem("myscores");
    
    if(str) {
    var temp = str.split(",");
    row=0;
    col=0;
    for (var a in temp ) {
    player_score[row][col] = parseInt(temp[a], 10); // Explicitly include base as per Álvaro's comment
    col++;
    if (col == 18) {
        col=0;
        row++;
    }
    } 
    for (col=0;col<18;col++){
        if (player_score[0][col]!=0) 
            hole=col;
    }
    hole++;
    move(0);
}
        str=localStorage.getItem("Players");
        if (str) {
        player=str.split(",");
    }
    $("#splayer1").val(player[0]).change();
    $("#splayer2").val(player[1]).change();
    $("#splayer3").val(player[2]).change();
    $("#splayer4").val(player[3]).change();
    $("#splayer5").val(player[4]).change();                          
    $('#player').html($("#splayer1").val());

   $("#New_Round").click(function() {
        for (var row=0;row<player_score.length;row++){
          for (var col=0;col< 18;col++){
              player_score[row][col]=0;
          }             
        } 
       display_card();
   });
   $("#h6").click(function() {
      $('select').selectmenu('refresh');
      gs1=0;
      $("#select-greenie").val(g1).change();

     });  
     $("#h14").click(function() {
         $('select').selectmenu('refresh');
         gs1=1;
          $("#select-greenie").val(g2).change();
     });
     $("#h17").click(function() {
       $('select').selectmenu('refresh');
       gs1=2;
        $("#select-greenie").val(g3).change();
     });
    $("#select-greenie").change(function() {
        if (gs1==0) {
            g1=$("#select-greenie").val();
        }
        if (gs1==1) {
            g2=$("#select-greenie").val();
        }
        if (gs1==2) {
            g3=$("#select-greenie").val();
        }
    }).change();
$( "#inpscore" ).bind({popupafterclose: function() {  
    display_card(); 
}
});   
      
$( "#Window" ).bind({popupafterclose: function() {
         player[0]=$("#splayer1").val();
        player[1]=$("#splayer2").val();
        player[2]=$("#splayer3").val();
        player[3]=$("#splayer4").val();
        player[4]=$("#splayer5").val();
        $("#p1").html(player[0]);
         $("#p2").html(player[1]);
         $("#p3").html(player[2]);
         $("#p4").html(player[3]);
         $("#p5").html(player[4]);
         $("#sp1").html(player[0]);
         $("#sp2").html(player[1]);
         $("#sp3").html(player[2]);
         $("#sp4").html(player[3]);
         $("#sp5").html(player[4]);
         $('#player').html($("#splayer1").val());
         localStorage.setItem("Players",player);
          }
});
      $("#show_specials").click(function() {
          $("#spPlayer").html(player[0]);
          birdies();
       $("#Specials").popup("open");    
      });
      $("#escor").change(function() {
          birdies();
      });
      $("#show_results").click(function() {
          var pw,pw3,pw4,pw5;
          calc_quarters(18);
          calc_nassau();
          var p1 =(m1+m2+m3)*.25+(mm1+mm2+mm3)*2.0 +(k1+k2+k3)*20.0;
          var p3 =(m1+m2)*.25+(mm1+mm2)*2.0 +(k1+k2)*20.0;
          var p4 =(m1+m3)*.25+(mm1+mm3)*2.0 +(k1+k3)*20.0;
          var p5 =(m2+m3)*.25+(mm2+mm3)*2.0 +(k2+k3)*20.0;
          if (p1 > 0) pw = " Wins $";
          else
              pw = " Loses $";
          if (p3 < 0) pw3 = " Wins $";
          else
              pw3 = " Loses $";
          if (p4 < 0) pw4 = " Wins $";
          else
              pw4 = " Loses $";
          if (p5 < 0) pw5 = " Wins $";
          else
              pw5 = " Loses $";
          
       $("#rpl1").html(player[0] + pw + Math.abs(p1).toFixed(2));
       $("#rpl2").html(player[1] + pw + Math.abs(p1).toFixed(2));
       $("#rpl3").html(player[2] + pw3 + Math.abs(p3).toFixed(2));
       $("#rpl4").html(player[3] + pw4 + Math.abs(p4).toFixed(2));
       $("#rpl5").html(player[4] + pw5 + Math.abs(p5).toFixed(2));
       $("#m1").html('Match 1: qrt' + m1 + ' ways ' + mm1 + ' knievel ' + k1);
       $("#m2").html('Match 2: qrt' + m2 + ' ways ' + mm2 + ' knievel ' + k2);
       $("#m3").html('Match 3: qrt' + m3 + ' ways ' + mm3 + ' knievel' + k3);
        $("#grns").html('Geenies:' + g1 + ' ' + g2 + ' ' + g3);
       $("#Results").popup("open");
       
    });
    i=0;
            $("#show_scores").click(function() {
                $("#scores").html(make_card(hole));
            });
            $(".scorebtn").click(function () {
               player_score[i][hole] = $(this).val();
               move(1); 
               localStorage.setItem("myscores",player_score);
            });
            $("#scrlfwd").click(function() {
               move(1);
            });
             $("#scrlbck").click(function() {
               move(0);
            });
            $("#addhole").click(function() {
                hole++;
               move(0,1);
            });
             $("#subhole").click(function() {
                hole--;
               move(0,1);
            }); 
            $(document).on('click','td',function() {
                if($('#display').val() < 3) {
                var sel_score=$(this).html();
                $('#escore').val(sel_score).selectmenu('refresh');
                 col1 = $(this).parent().children().index($(this));
                 row1 = $(this).parent().parent().children().index($(this).parent());
                $("#enter_score").popup("open", {positionTo: this});
            }
                 });
               $('#escore').change(function() {
                   if($('#display').val() === "2") {
                       col1 +=9;
                   }
                 player_score[row1][col1-1] = $('#escore').val();
                 $('#enter_score').popup('close');
                 if($('#display').val() === "1")
                     $("#scores").html(make_card(0));
                 else
                     $("#scores").html(make_card(10));
                 localStorage.setItem("myscores",player_score);
               });  
            $("#display").change(function() {
                display_card();
});
 $("#scores").html(make_card(0));
});
function move(w,p) {
                if (w)
                i++;
            else
                i--;
            if (p) i=0;
                 if (i > 4) {
                     i=0;
                     hole++;
                 }
                 if (i < 0) {
                     i=4;
                     hole--;
                 }
                 if (hole > 17) hole=17;
                 if(hole <0) hole=0;
                     var dhole=hole+1;
                     $('#Hole').html('Hole ' + dhole);
                      $('#player').html(player[i]);
                      $('#pscore').html('Score ' + player_score[i][hole]);
                 }
   
   function calc_quarters (hh)
   {
            var t1=0;
           var t2=0;
           var t3=0;
           var b1=0;
           var b2=0;
           var b3=0;
           var b4=0;
           var t4=0;
           m1=0;
           m2=0;
           m3=0;
           var parc;
           var ai;
       for (var ii=0;ii<hh;ii++) {
           ai=ii+1;
         parc = par[ii]*2;
         t1 = (player_score[0][ii]-0) +(player_score[1][ii]-0);
         t2 = (player_score[2][ii]-0) +(player_score[3][ii]-0);
         t3 = (player_score[2][ii]-0)+ (player_score[4][ii]-0);
         t4 = (player_score[3][ii]-0) +(player_score[4][ii]-0);
         b1 = min(player_score[0][ii]-0,player_score[1][ii]-0);
         b2 = min(player_score[2][ii]-0,player_score[3][ii]-0);
         b3 = min(player_score[2][ii]-0,player_score[4][ii]-0);
         b4 = min(player_score[3][ii]-0,player_score[4][ii]-0);
         ai =ii+1;
         if (t1<t2) m1 += ai;
         if (t1<t3) m2 += ai;
         if (t1<t4) m3 += ai;
         if (t1>t2) m1 -= ai;
         if (t1>t3) m2 -= ai;
         if (t1>t4) m3 -= ai;
         
         if (b1<b2) m1 += ai;
         if (b1<b3) m2 += ai;
         if (b1<b4) m3 += ai;
         if (b1>b2) m1 -= ai;
         if (b1>b3) m2 -= ai;
         if (b1>b4) m3 -= ai;
         
        
         if (b1<b2 && t1<t2 && t1 < parc) m1 += ai*2*(parc-t1)-ai*2;
         if (b1<b3 && t1<t3 && t1 < parc) m2 += ai*2*(parc-t1)-ai*2;
         if (b1<b4 && t1<t4 && t1 < parc) m3 += ai*4*(parc-t1)-ai*2;
         if (b1>b2 && t1>t2 && t2 < parc) m1 -= ai*4*(parc-t2)-ai*2;
         if (b1>b3 && t1>t3 && t3 < parc) m2 -= ai*4*(parc-t3)-ai*2;
         if (b1>b4 && t1>t4 && t4 < parc) m3 -= ai*4*(parc-t4)-ai*2;
       }
   }
   function min(s1,s2) {
       if (s1<s2)
           return s1;
           else
            return s2;
   }
function make_card(hl) {
 var p1_score;
 var is;
 var j=skins();
 console.log(j);
 if (hl > 8) {
     is=9;
       p1_score = '<table id=tscore><thead><th>player</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>tot</th></thead>';            is=9;
       } 
        else    {
          is=0;   
       p1_score = '<table id=tscore><thead><th>player</th><th> 1</th><th> 2</th><th> 3</th><th> 4</th><th> 5</th><th> 6</th><th> 7</th><th> 8</th><th> 9</th><th>tot</th></thead>';
                }
              for (ii=0;ii<5;ii++) {
                   p1_score+= '<tr><td>'+player[ii] +'</td>';
                   var sumsc =0;
                  for (jj=is;jj<is+9;jj++)
                      {
                          p1_score+= makeclass(ii,jj);
                          sumsc +=player_score[ii][jj]-0;
                  }
                      p1_score+= '<td>' + sumsc + '</td></tr>';
          }
               p1_score+='</table>';
               return p1_score; 
}
function make_card1(hl) {
 var p1_score;
 var is;
 
 if (hl > 8) {
     is=9;
       p1_score = '<table id=tscore><thead><th>match</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>tot</th></thead>';            is=9;
       } 
        else    {
          is=0;   
       p1_score = '<table id=tscore><thead><th>match</th><th> 1</th><th> 2</th><th> 3</th><th> 4</th><th> 5</th><th> 6</th><th> 7</th><th> 8</th><th> 9</th><th>tot</th></thead>';
                }
              for (ii=0;ii<3;ii++) {
                   p1_score+= '<tr><td>Match ' + (ii+1) + ' </td>';
                  for (jj=is;jj<is+9;jj++)
                      {
                          var ai=jj+1;
                          calc_quarters(ai)
                       if (ii==0)
                          p1_score+='<td>' +m1 + "</td>";
                      else if (ii==1)
                           p1_score+='<td>' +m2 + "</td>";
                       else
                            p1_score+='<td>' +m3+ "</td>";
                      }
                  }
                      p1_score+= '</tr>';
               p1_score+='</table>';
               return p1_score;  
}
function make_card2(hl) {
 var p1_score;
 var is;
 var temp = new Array;
 var temp1 = new Array;
 var temp2 = new Array;
 
 if (hl > 9) {
     is=9;
       p1_score = '<table id=tscore><thead><th>match</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>tot</th></thead>';
       calc_ways(9,18,2,3,false);
                   temp = way_string.split(",");
                    calc_ways(9,18,2,4,false);
                   temp1 = way_string.split(",");
                    calc_ways(9,18,3,4,false);
                   temp2 = way_string.split(",");
       } 
        else    {
          is=0;   
       p1_score = '<table id=tscore><thead><th>match</th><th> 1</th><th> 2</th><th> 3</th><th> 4</th><th> 5</th><th> 6</th><th> 7</th><th> 8</th><th> 9</th><th>tot</th></thead>';
       calc_ways(0,9,2,3,false);
                   temp = way_string.split(",");
                    calc_ways(0,9,2,4,false);
                   temp1 = way_string.split(",");
                    calc_ways(0,9,3,4,false);
                   temp2 = way_string.split(",");
                }
              for (ii=0;ii<3;ii++) {
                   p1_score+= '<tr><td>Match ' + (ii+1) + ' </td>';
                   var ai=0;
                  for (jj=is;jj<is+9;jj++)
                      {                         
                       if (ii==0)
                          p1_score+='<td>' + temp[ai] + "</td>";
                      else if (ii==1)
                           p1_score+='<td>' +temp1[ai] + "</td>";
                       else
                            p1_score+='<td>' + temp2[ai] + "</td>";
                        ai++;
                      }
                  }
                      p1_score+= '</tr>';
               p1_score+='</table>';
               return p1_score;  
}
function calc_nassau()
{
    mm1=0,mm2=0,mm3=0;
    mm1 += calc_ways(0,9,2,3,true);
    mm2 += calc_ways(0,9,2,4,true);
    mm3 += calc_ways(0,9,3,4,true);
    mm1 += calc_ways(9,18,2,3,true);
    mm2 += calc_ways(9,18,2,4,true);
    mm3 += calc_ways(9,18,3,4,true);
    mm1 += calc_ways(9,18,2,3,false);
    mm2 += calc_ways(9,18,2,4,false);
    mm3 += calc_ways(9,18,3,4,false);
    mm1 += calc_ways(8,9,2,3,false);
    mm2 += calc_ways(8,9,2,4,false);
    mm3 += calc_ways(8,9,3,4,false);
    mm1 += calc_ways(17,18,2,3,false);
    mm2 += calc_ways(17,18,2,4,false);
    mm3 += calc_ways(17,18,3,4,false);
    k1=calc_ways(0,18,2,3,false);
    k2=calc_ways(0,18,2,4,false);
    k3=calc_ways(0,18,3,4,false);
    mm1 += k1;
    mm2 +=k2;
    mm3 +=k3;
    var kpfh1=calc_pfh(2,3);
    var kpfh2=calc_pfh(2,4);
    var kpfh3=calc_pfh(3,4);
    k1=k1+kpfh1*.5;
    k2=k2+kpfh2*.5;
    k3=k3+kpfh3*.5; 
}


function calc_ways(istart,iend,marary1,marary2,autop) {
       var mc1=0;
       var w1=0;
       var cur_down=0;
       way_string="";
       var darray = new Array(iend-istart);
       for (var ii=istart;ii<iend;ii++) {
         var b2 = min(player_score[marary1][ii]-0,player_score[marary2][ii]-0);
         var b1 = min(player_score[0][ii]-0,player_score[1][ii]-0);
         if (b1<b2) { mc1 += 1; cur_down += 1; }
         if (b1>b2) { mc1 -= 1; cur_down -= 1;}
         way_string= way_string + mc1 + ",";
         darray[ii-istart]=mc1;
         }
    if (mc1 > 0) w1 +=1;
    else if (mc1<0) w1 -=1;
    if (autop) {
        var p1=0;
        var p2=0;
        var p3=0;
        for (var ii = istart;ii<iend;ii++) {
            var kk = ii-istart;
            if (Math.abs(darray[kk])==2) {
                p1=ii;
                if (darray[8]-darray[kk] > 0) w1++;
                if (darray[8]-darray[kk] < 0) w1--;
                ii=iend;
            }
        }
        if (p1) {
            for (ii=p1+1;ii<iend;ii++) {
              kk=ii-istart;
              var kp = Math.abs(darray[kk]-darray[p1-istart]);
              if (kp ==2) {
                  p2=ii;
                  if (darray[8]-darray[kk] > 0) w1++;
                if (darray[8]-darray[kk] < 0) w1--;
                ii=iend;
              }
            }
        }
        if (p2) {
          for (ii=p2+1;ii<iend;ii++) {
              kk=ii-istart;
              var kp = Math.abs(darray[kk]-darray[p2-istart]);
              if (kp ==2) {
                  p3=ii;
                  if (p3 < iend-2){
                  if (darray[8]-darray[kk] > 0) w1++;
                if (darray[8]-darray[kk] < 0) w1--;
            }
                ii=iend;
              }
            }  
        }
}
return w1;
}
function calc_pfh(marary1,marary2) {
  var mp1=0;
  var kh=0;
       for (var ii=0;ii<18;ii++) {
         var b2 = min(player_score[marary1][ii]-0,player_score[marary2][ii]-0);
         var b1 = min(player_score[0][ii]-0,player_score[1][ii]-0);
         if (b1<b2) mp1 += 1;
         if (b1>b2) mp1 -= 1;  
         if ((17-ii) < mp1 && ii < 17) {
             kh = calc_ways(ii+1,18,marary1,marary2,false);
             ii=18;
         }
         if ((17-ii) < -mp1) {
             kh = calc_ways(ii+1,18,marary1,marary2,false);
             ii=18;
         }
     }
     return kh;
         }
function display_card() {
    if ($("#display").val() == 1) {
                $("#scores").html(make_card(0));
            }
                       else if ($("#display").val() == 2) {
               $("#scores").html(make_card(10)); 
           }
                       else if ($("#display").val() == 3) {
               $("#scores").html(make_card1(0)); 
           }
                       else if ($("#display").val() == 4) {
               $("#scores").html(make_card1(10)); 
           }
            else if ($("#display").val() == 5) {
                wl=0;
               $("#scores").html(make_card2(0)); 
           }
            else if ($("#display").val() == 6) {
                wl=0;
               $("#scores").html(make_card2(10)); 
           };                        
}
function skins() {
  var j=0;
  var count;
  for (ii=0;ii<5;ii++) {
      for (kk=0;kk<18;kk++){
          skin[ii][kk]=false;
      }
  }
  for (ii=0;ii<18;ii++) {
      myarray =Math.min(player_score[0][ii],player_score[1][ii],player_score[2][ii],player_score[3][ii],player_score[4][ii]);
      count=0;
     for (kk=0;kk<5;kk++)
         if (player_score[kk][ii] == myarray) {
             count++;
             sply=kk;
         }
      if (count==1) {
     if (Math.min(player_score[0][ii+1],player_score[1][ii+1],player_score[2][ii+1],player_score[3][ii+1],player_score[4][ii+1]) == player_score[sply][ii+1] || ii==17) {
         for (jj=j;jj<=ii;jj++) skin[sply][jj]=true;
        j =ii+1;
    }          
    }
    }
    console.log(skin[0][0]);
    return j;
}
function makeclass(ii,jj) {
    var classstring ="";
    var tdstring;
     if (player_score[ii][jj]==(par[jj]-1))
                     classstring += ' redBg ';    
                      else if ((jj==5 && (g1-1) == ii) || (jj == 13 && (g2-1) == ii) || (jj==16 && (g3-1) == ii))
                       classstring += ' greenBg';    
     if  (skin[ii][jj]) 
                 classstring += ' skinBorder '; 
                   if (classstring)
                      tdstring ='<td class="' + classstring + '">' + player_score[ii][jj]+ "</td>";
                  else
                      tdstring ='<td>' + player_score[ii][jj]+ "</td>";
                      return tdstring;
}
function birdies() {
    var bd=0;
    var sk=0;
    var nd=2;
    var ndb =1;
    var ndf =1;
    var j = $("#escor").val();
    for (k=0;k<18;k++) {
     if (player_score[j][k] < par[k] && player_score[j][k] > 0) bd++;
      if(skin[j][k])   sk++;
      if(player_score[j][k] > (par[k]+ 1)) {
          if (k<9) ndf=0;
          else ndb = 0;
      }
    }
    nd=ndf+ndb;
    $("#birdies").html("Birdies = " + bd);
    $("#skins").html("Skins = " + sk);
    $("#noDubs").html("No Dubs = " + nd );
    
}


