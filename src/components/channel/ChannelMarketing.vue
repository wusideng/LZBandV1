<template>
  <div class="marketing">
    <div class="mk-card mkt-card">
      <div class="title">营销效果分析</div>
      <div class="mkt-top">
        <div class="mk-val-item"><span class="vl">活动参与</span><span class="vv">{{ animPart }}</span><span class="vu">万人</span></div>
        <div class="mk-val-item"><span class="vl">理财转化</span><span class="vv">{{ animWealth }}</span><span class="vu">万人</span></div>
        <div class="mk-val-item"><span class="vl">信贷转化</span><span class="vv">{{ animCredit }}</span><span class="vu">万人</span></div>
        <div class="gauge-mini" ref="mktGaugeRef"></div>
      </div>
      <div class="mkt-funnel" ref="funnelRef"></div>
    </div>
    <div class="mk-card profile-card">
      <div class="title">客户画像
        <span class="ptab" @click="activeProfile='age'" :class="{on:activeProfile==='age'}">年龄</span>
        <span class="ptab" @click="activeProfile='gender'" :class="{on:activeProfile==='gender'}">性别</span>
        <span class="ptab" @click="activeProfile='income'" :class="{on:activeProfile==='income'}">收入</span>
      </div>
      <div class="profile-chart" ref="profileChartRef"></div>
      <div class="tag-cloud">
        <span v-for="t in prefTags" :key="t.name" class="tag" :style="{ fontSize: 9 + t.value / 20 + 'px', opacity: 0.4 + t.value / 150 }">{{ t.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import { marketingData, customerProfile } from '../../mockData/channelData'

const animPart = ref('0'); const animWealth = ref('0'); const animCredit = ref('0')
const mktGaugeRef = ref(null); const funnelRef = ref(null); const profileChartRef = ref(null)
let gauge, funnel, profile

const activeProfile = ref('age')
const prefTags = ref(customerProfile.preferenceTags)

const animate = (target, setter) => { const dur=1600,s=Date.now(); const fn=()=>{const p=Math.min((Date.now()-s)/dur,1);setter((target*(1-Math.pow(1-p,3))).toFixed(1));if(p<1)requestAnimationFrame(fn)};fn() }

const initGauge = () => { if(!mktGaugeRef.value)return; gauge=echarts.init(mktGaugeRef.value); gauge.setOption({series:[{type:'gauge',center:['50%','55%'],radius:'75%',startAngle:220,endAngle:-40,min:0,max:100,progress:{show:true,width:5,roundCap:true,itemStyle:{color:{type:'linear',x:0,y:0,x2:1,y2:0,colorStops:[{offset:0,color:'#0066FF'},{offset:0.5,color:'#00D4FF'},{offset:1,color:'#00FF88'}]}}},axisLine:{lineStyle:{width:5,color:[[1,'rgba(0,212,255,0.1)']]}},axisTick:{show:false},splitLine:{length:3,lineStyle:{width:1,color:'rgba(0,212,255,0.12)'}},axisLabel:{distance:4,color:'rgba(255,255,255,0.25)',fontSize:6},detail:{valueAnimation:true,formatter:'{value}%',color:'#00D4FF',fontSize:12,fontFamily:'DIN Alternate',offsetCenter:[0,'25%']},title:{offsetCenter:[0,'58%'],fontSize:7,color:'rgba(255,255,255,0.4)'},pointer:{show:true,length:'45%',width:2,itemStyle:{color:'#00D4FF'}},data:[{value:marketingData.marketingConversionRate,name:'转化率'}]}]},true)}

const initFunnel = () => { if(!funnelRef.value)return; funnel=echarts.init(funnelRef.value); funnel.setOption({tooltip:{trigger:'item',backgroundColor:'rgba(10,22,40,0.9)',borderColor:'#FFD700',textStyle:{color:'#fff',fontSize:8},formatter:(p)=>`${p.name}: ${p.value}%`},series:[{type:'funnel',left:20,right:60,top:10,bottom:10,minSize:15,maxSize:100,label:{show:true,position:'left',color:'rgba(255,255,255,0.5)',fontSize:7,formatter:(p)=>p.name+' '+p.value+'%'},labelLine:{show:false},itemStyle:{borderColor:'#0A1628',borderWidth:1},data:marketingData.clickToPurchaseFunnel,color:['#FFD700','#FFAA00','#FF8C00','#FF6600','#FF4400']}]},true)}

const initProfile = () => { if(!profileChartRef.value)return; profile=echarts.init(profileChartRef.value); updateProfile() }

const updateProfile = () => {
  if(!profile)return
  if(activeProfile.value==='age'){
    profile.setOption({tooltip:{trigger:'item',backgroundColor:'rgba(10,22,40,0.9)',borderColor:'#00D4FF',textStyle:{color:'#fff',fontSize:8},formatter:'{b}: {c}%'},series:[{type:'pie',radius:['40%','70%'],center:['50%','50%'],label:{show:true,color:'rgba(255,255,255,0.5)',fontSize:7,formatter:'{b}\n{d}%'},labelLine:{length:3,length2:2,lineStyle:{color:'rgba(255,255,255,0.1)'}},emphasis:{scale:false},data:customerProfile.ageDistribution,itemStyle:{borderColor:'#0A1628',borderWidth:1},color:['#00D4FF','#0099FF','#0066FF','#0033CC','#001166']}]},true)
  } else if(activeProfile.value==='gender'){
    profile.setOption({tooltip:{trigger:'item',backgroundColor:'rgba(10,22,40,0.9)',borderColor:'#FFD700',textStyle:{color:'#fff',fontSize:8},formatter:'{b}: {c}%'},series:[{type:'pie',radius:['40%','70%'],center:['50%','50%'],label:{show:true,color:'rgba(255,255,255,0.5)',fontSize:8,formatter:'{b}\n{d}%'},labelLine:{length:4,length2:3,lineStyle:{color:'rgba(255,255,255,0.1)'}},emphasis:{scale:false},data:customerProfile.genderDistribution,itemStyle:{borderColor:'#0A1628',borderWidth:1},color:['#00D4FF','#FF6B6B']}]},true)
  } else {
    profile.setOption({tooltip:{trigger:'item',backgroundColor:'rgba(10,22,40,0.9)',borderColor:'#00FF88',textStyle:{color:'#fff',fontSize:8}},radar:{center:['50%','50%'],radius:'60%',indicator:customerProfile.incomeLevels.indicators,axisName:{color:'rgba(255,255,255,0.5)',fontSize:8},splitArea:{areaStyle:{color:['rgba(0,212,255,0.02)','rgba(0,212,255,0.04)']}},splitLine:{lineStyle:{color:'rgba(0,212,255,0.1)'}}},series:customerProfile.incomeLevels.data.map((d,i)=>[{
      name:d.name,type:'radar',data:[{value:d.value}],symbol:'circle',symbolSize:3,
      lineStyle:{color:['#00D4FF','#00FF88','#FFD700'][i],width:1.5},
      itemStyle:{color:['#00D4FF','#00FF88','#FFD700'][i]},
      areaStyle:{color:new echarts.graphic.LinearGradient(0,0,1,1,[{offset:0,color:'rgba(0,212,255,0.1)'},{offset:1,color:'rgba(0,212,255,0)'}])}
    }])[0]},true)
  }
}

const switchProfile = (v) => { activeProfile.value=v; updateProfile() }
const all=()=>[gauge,funnel,profile]

onMounted(()=>{
  animate(marketingData.campaignParticipants,v=>animPart.value=v)
  animate(marketingData.wealthConversion,v=>animWealth.value=v)
  animate(marketingData.creditConversion,v=>animCredit.value=v)
  initGauge(); initFunnel(); initProfile()
  nextTick(()=>all().forEach(c=>c?.resize()))
  window.addEventListener('resize',()=>all().forEach(c=>c?.resize()))
})
onUnmounted(()=>all().forEach(c=>c?.dispose()))
</script>

<style lang="scss" scoped>
.marketing { display: flex; flex-direction: column; gap: 8px; height: 100%; min-height: 0; }
.mk-card { background: rgba(10,22,40,0.85); border: 1px solid rgba(0,212,255,0.18); border-radius: 4px; position: relative; overflow: hidden; }
.mk-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #00D4FF, transparent); }
.title { padding: 5px 8px; font-size: 11px; color: #00D4FF; font-weight: 600; border-bottom: 1px solid rgba(0,212,255,0.1); display: flex; align-items: center; gap: 6px; flex: 0 0 auto; }
.title::before { content: ''; width: 3px; height: 10px; background: #00D4FF; border-radius: 2px; flex-shrink: 0; }
.mkt-card { flex: 0 0 55%; min-height: 0; display: flex; flex-direction: column; }
.profile-card { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.mkt-top { display: flex; gap: 3px; padding: 3px; flex: 0 0 auto; align-items: center; }
.mk-val-item { background: rgba(0,212,255,0.04); padding: 3px 5px; border-radius: 2px; border: 1px solid rgba(0,212,255,0.06); display: flex; flex-direction: column; flex: 1; }
.mk-val-item .vl { font-size: 8px; color: rgba(255,255,255,0.5); }
.mk-val-item .vv { font-size: 14px; font-weight: 700; color: #FFD700; font-family: 'DIN Alternate',monospace; }
.mk-val-item .vu { font-size: 7px; color: rgba(255,255,255,0.25); }
.gauge-mini { width: 80px; height: 60px; flex-shrink: 0; }
.mkt-funnel { flex: 1; min-height: 0; }
.profile-chart { flex: 1; min-height: 0; }
.ptab { font-size: 8px; color: rgba(255,255,255,0.3); cursor: pointer; padding: 1px 5px; border-radius: 4px; border: 1px solid transparent; margin-left: 0; }
.ptab.on { color: #00D4FF; background: rgba(0,212,255,0.1); border-color: rgba(0,212,255,0.2); }
.tag-cloud { flex: 0 0 auto; display: flex; flex-wrap: wrap; gap: 3px; padding: 3px 6px; justify-content: center; }
.tag { color: #00D4FF; padding: 1px 5px; background: rgba(0,212,255,0.06); border-radius: 8px; border: 1px solid rgba(0,212,255,0.1); transition: all .3s; }
.tag:hover { background: rgba(0,212,255,0.15); border-color: rgba(0,212,255,0.3); }
</style>